import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from "@angular/router";
import { CustomerService } from "./services/CustomersService";
import { ProductService } from "./services/ProductsService";
import { OrdersService } from "./services/OrdersService";
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';

import { CustomersListComponent } from './customers/customers-list.component';
import { CustomerDetailsComponent } from './customers/customer-details.component';
import { ProductsListComponent } from './products/product-list.component';
import { ProductDetailsComponent } from './products/product-details.component';

import { OrderListComponent } from './orders/order-list.component';
import { OrderDetailsComponent } from './orders/order-details.component';
import { OrderlineFormComponent } from './orders/order-line-form.component';

const appRoutes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent },

    { path: "customers", component: CustomersListComponent },
    { path: "customers/:id", component: CustomerDetailsComponent },

    { path: "products", component: ProductsListComponent },
    { path: "product/:id", component: ProductDetailsComponent },
    { path: "orders", component: OrderListComponent },
    { path: "order/:id", component: OrderDetailsComponent },
];

@NgModule({
  declarations: [
      AppComponent,
      HomeComponent,
      CustomersListComponent,
      CustomerDetailsComponent,
      ProductsListComponent,
      ProductDetailsComponent,
      OrderListComponent,
      OrderDetailsComponent,
      OrderlineFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [CustomerService,ProductService,OrdersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
