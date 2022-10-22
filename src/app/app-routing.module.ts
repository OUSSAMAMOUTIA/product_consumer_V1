import {ProductsComponent} from './component/products/products.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersComponent} from './component/customers/customers.component';
import {LoginComponent} from "./component/login/login.component";
import {AdminTemplateComponent} from "./component/admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {ProductCreateComponent} from "./component/products/product-create/product-create.component";
import {ProductEditComponent} from "./component/products/product-edit/product-edit.component";

const components = [LoginComponent, AdminTemplateComponent, ProductsComponent,
  ProductCreateComponent, ProductEditComponent,CustomersComponent];
const routes: Routes = [
  {path: "", component: components[0]},
  {path: "login", component: components[0]},
  {
    path: "admin", component: components[1], canActivate: [AuthenticationGuard], children: [
      {path: "products", component: components[2]},
      {path: "newProduct", component: components[3]},
      {path: "editProduct/:id", component: components[4]},
      {path: "customers", component: components[5]},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
