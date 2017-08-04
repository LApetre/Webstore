import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "../products/product";
import { OrdersService } from "../services/OrdersService";
import { Order, OrderDetail } from "../orders/order";
import { CustomerService } from "../services/CustomersService";
import { Customer } from '../customers/Customer';
import { ProductService } from '../services/ProductsService';

import { OrderlineFormComponent } from './order-line-form.component';
@Component({
    selector: 'order-details',
    templateUrl: './order-details.component.html',
    providers: []
})
export class OrderDetailsComponent implements OnInit {

    order: Order=new Order();
    ready: boolean = false
    customerList: Customer[];
    customer: Customer ;
    orderlineList: OrderDetail[] = new Array<OrderDetail>();
    nr: number;
    orderlineCurrent: OrderDetail;
    productCurrent: Product;
    productList: Product[];
    new: boolean=false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrdersService,
        private customerService: CustomerService,
        private productService: ProductService,
    ) {
    }

    ngOnInit() {
        this.customerService.getCustomerPage(0, 100, "", 0, 100).then(result => (this.customerList = result.Data));
        this.productService.getProductPage(0, 100, "", -1, -1).then(result => this.productList = result.Data);

        this.route.params
            .switchMap((params: Params) => {

                let id = params["id"];

                if ("new" == id) {
                    alert("Adding a new order");
                  //  this.order.Id = -1;
                    this.new = true;
                    this.order.OrderDate = new Date();
                    this.customer = new Customer();
                //    this.customer.Id = -1;
                    this.customer.DiscountPercent = 0;
                    this.order.OrderLines = this.orderlineList;
                    this.order.Customer = this.customer;
                } else {
                    alert("Editing order with id " + id);
                    this.orderService
                        .getOrderById(id)
                        .then(result => (this.order = result,
                            this.customer = this.customerList.find(x => x.Id == result.Id), console.log(this.customer),
                            this.orderlineList = result.OrderLines));
                    console.log(this.customer);
                   // this.customer = this.order.Customer;
                }


                return Observable.of<any>(id);
            })
            .subscribe((id: any) => {
            });
       
    }

    addToDB(): void {
        //this.order.CustomerId = this.customer.Id;
        //this.order.Customer = this.customer;
        if (this.new)
        {
            this.order.Customer = this.customer;
            this.order.CustomerId = this.customer.Id;
        }
        this.orderService.addToDB(this.order).subscribe();
       // this.ready = true;
    }

    edit(orderline: OrderDetail)
    {
      //  this.orderlineId = orderline.Id;
        this.orderlineCurrent = orderline;
        console.log(this.orderlineCurrent.Product);
     //   this.orderlineCurrent.Product = orderline.Product;
        this.ready = true;
    }
    add()
    {
        let line = new OrderDetail();
        // line.Id = -1;
        line.Price = 0; line.Quantity = 0; line.TotalPrice = 0; line.TotalPriceWithoutDiscount = 0;
        this.productCurrent = new Product();
        line.Product = new Product();
        line.Product.Name = "unknown";
        this.orderlineCurrent = line;
      //  this.orderlineCurrent.Product = new Product();
        this.order.OrderLines.push(this.orderlineCurrent);
        this.ready = true;
    }
    productChange()
    {
        // this.productService.getProductById(this.orderlineCurrent.Product.Id).then(result => (this.orderlineCurrent.Product = result, this.orderlineCurrent.ProductId = result.Id, this.orderlineCurrent.Price = result.ListPrice));   
        this.orderlineCurrent.Price = this.orderlineCurrent.Product.ListPrice;
    }

    refreshReady(): void {
        this.ready = false;
    }
    calculatePrices(): void {
        this.order.OrderLines.forEach(x => x.TotalPrice = x.TotalPriceWithoutDiscount * (100 - this.order.DiscountPercent) / 100);
    }
    refdisc()
    {
        //this.order.CustomerId = this.customer.Id;
        console.log(this.customer);
        this.order.DiscountPercent = this.customer.DiscountPercent;
    }
    done()
    {
       // this.orderlineCurrent.Product = this.productCurrent;
       // this.orderlineCurrent.ProductId = this.productCurrent.Id;
        this.orderlineCurrent.TotalPriceWithoutDiscount = this.orderlineCurrent.Quantity * this.orderlineCurrent.Price;
        this.orderlineCurrent.ProductId = this.orderlineCurrent.Product.Id;
        this.order.OrderLines.pop();
        this.order.OrderLines.push(this.orderlineCurrent);
        this.refreshReady();
        this.calculatePrices();
       // this.
    }

}