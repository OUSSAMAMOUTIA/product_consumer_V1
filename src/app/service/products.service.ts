import {Injectable} from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProduct, Product} from "../model/product.model";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products!: Array<Product>;

  constructor() {
    this._products = [
      {id: UUID.UUID(), name: "Computer", price: 6500, promotion: true},
      {id: UUID.UUID(), name: "Printer", price: 1200, promotion: false},
      {id: UUID.UUID(), name: "Smart Phone", price: 1800, promotion: true},
    ];
    for (let i = 0; i < 10; i++) {
      this._products.push({id: UUID.UUID(), name: "Computer", price: 6500, promotion: true},
        {id: UUID.UUID(), name: "Printer", price: 1200, promotion: false},
        {id: UUID.UUID(), name: "Smart Phone", price: 1800, promotion: true},);
    }
  }

  public getAllProducts(): Observable<Product[]> {
    return of([...this._products]);
  }

  public getPageProducts(page: number, size: number): Observable<PageProduct> {
    let index = page * size;
    let totalPages = ~~(this._products.length / size);
    if (totalPages % size != 0)
      totalPages++;
    let pageProducts = this._products.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProducts});
  }

  public deleteProduct(product: Product): Observable<boolean> {
    // @ts-ignore
    let index = this._products.indexOf(product);
    console.log("hada index", index);
    this._products.splice(index, 1);
    return of(true);
  }

  public setPromotion(id: string): Observable<boolean> {
    let product = this._products.find(product => product.id == id);
    if (product != undefined) {
      product.promotion = !product.promotion;
      return of(true);
    } else {
      return throwError(() => new Error("Product Not Found"));
    }
  }

  public searchProducts(keyword: string, page: number, size: number): Observable<PageProduct> {
    let productsResult = this._products.filter(product => product.name.includes(keyword));
    let index = page * size;
    let totalPages = ~~(productsResult.length / size);
    if (totalPages % size != 0)
      totalPages++;
    let pageProducts = productsResult.slice(index, index + size);
    return of({page: page, size: size, totalPages: totalPages, products: pageProducts});
  }

  public addNewProduct(product: Product): Observable<Product> {
    product.id = UUID.UUID();
    this._products.push(product);
    return of(product);
  }
  public updateProduct(product: Product): Observable<Product> {
    this._products = this._products.map(p=>p.id==product.id?product:p);
    return of(product);
  }
  public getProduct(id: string): Observable<Product> {
    let product = this._products.find(product => product.id == id);
    if (product == undefined)
    return   throwError(() => new Error("Product Not Found"));
    return of(product);
  }
  public getErrorMessage(field: string, error: ValidationErrors) {
    if (error['required'])
      return field + ' is required';
    else if (error['minlength'])
      return field + ' should have at least ' + error["minlength"]["requiredLength"] + " Characters";
    if (error['min'])
      return field + ' should have min value ' + error["min"]["min"];
    else return "";
  }
}

/*let rnd = Math.random();
if (rnd < 0.5) return throwError(() => new Error("Connection error "))
else return of(this._products);*/
