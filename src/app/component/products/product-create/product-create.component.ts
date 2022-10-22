import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {ProductsService} from "../../../service/products.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
  }

  ngOnInit(): void {
    this.productFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(null, [Validators.required, Validators.minLength(4)]),
      price: this.formBuilder.control(0, [Validators.required, Validators.min(200)]),
      promotion: this.formBuilder.control(false, [Validators.required]),
    })
  }

  handleNewProduct() {
    let product = this.productFormGroup.value;
    this.productService.addNewProduct(product).subscribe({
      next: (data) => {
        alert("Product Added successfully");
        this.productFormGroup.reset();
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  getErrorMessage(field: string, error: ValidationErrors) {
    this.productService.getErrorMessage(field, error);
  }

}
