import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './component/products/products.component';
import { CustomersComponent } from './component/customers/customers.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { AdminTemplateComponent } from './component/admin-template/admin-template.component';
import { ProductCreateComponent } from './component/products/product-create/product-create.component';
import { ProductEditComponent } from './component/products/product-edit/product-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    LoginComponent,
    AdminTemplateComponent,
    ProductCreateComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
