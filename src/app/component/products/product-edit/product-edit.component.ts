import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductsService} from "../../../service/products.service";
import {Product} from "../../../model/product.model";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId!: string;
  product!: Product;
  productFormGroup!: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductsService,
              private formBuilder: FormBuilder) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        alert(err);
      }
    })
    this.productFormGroup = this.formBuilder.group({
      name: this.formBuilder.control(this.product.name, [Validators.required, Validators.minLength(4)]),
      price: this.formBuilder.control(this.product.price, [Validators.required, Validators.min(200)]),
      promotion: this.formBuilder.control(this.product.promotion, [Validators.required]),
    })
  }
  handleEditProduct() {
    let product = this.productFormGroup.value;
    product.id=this.product.id;
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        alert("Product Updated successfully");
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
