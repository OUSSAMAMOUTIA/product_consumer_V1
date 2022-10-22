import {Component, OnInit} from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {Product} from "../../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthentificationService} from "../../service/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  currentPage: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;
  errorMessage!: string;
  searchFormGroup!: FormGroup
  currentAction: string = "All";

  constructor(private productService: ProductsService,
              private formBuilder: FormBuilder,
              public authService: AuthentificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.formBuilder.group({
      keyword: this.formBuilder.control(null)
    })
    this.handleGetPageProducts();
  }

  public handleGetPageProducts() {
    this.productService.getPageProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      },
      error: (err: any) => {
        this.errorMessage = err;
      }
    });
  }

  public handleGetAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err: any) => {
        this.errorMessage = err;
      }
    });
  }

  public deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe({
      next: (data) => {
        // this.handleGetAllProducts();
        let index = this.products.indexOf(product);
        this.products.splice(index, 1);
      }
    });
  }

  updateProduct(product: Product) {
    this.router.navigateByUrl("admin/editProduct/" + product.id);
  }

  setPromotion(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next: (data) => {
        p.promotion = !promo;
      },
      error: (err) => {
        this.errorMessage = err;
      }
    })
  }

  searchProducts() {
    this.currentAction = "Search";
    this.currentPage = 0;
    let keyword = this.searchFormGroup.value.keyword;
    this.productService.searchProducts(keyword, this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages = data.totalPages;
      }
    })
  }

  goToPage(i: number) {
    this.currentPage = i;
    this.currentAction == "All" ? this.handleGetPageProducts() : this.searchProducts();

  }

  handleNewProdcut() {
    this.router.navigateByUrl("admin/newProduct");
  }
}
