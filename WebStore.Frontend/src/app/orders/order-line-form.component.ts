import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "../products/product";
import { OrdersService } from "../services/OrdersService";
import { ProductService } from "../services/ProductsService";
import { Order, OrderDetail } from "../orders/order";
import { CustomerService } from "../services/CustomersService";
import { Customer } from '../customers/Customer';
@Component({
    selector: 'order-line-form',
    templateUrl: './order-line-form.component.html',
    providers: []
})
export class OrderlineFormComponent implements OnInit {

    @Input() orderline: OrderDetail = new OrderDetail();
  //  @Input() orderlineID: number;
    ready: boolean = true
    productList: Product[];
    @Input() product: Product = new Product();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private orderService: OrdersService,
        private productService: ProductService,
    ) {
    }


    //@Input()
    //set orderlineID_(orderlineID: number) {
    //    this.orderlineID = orderlineID;
    //}

    @Input()
    set orderline_(orderline: OrderDetail) {
        this.orderline = orderline;
    }
    @Input()
    set product_(product: Product) {
        this.product = product;
    }
    ngOnInit() {

        this.productService.getProductPage(0, 100, "", 0, 100).then(result => this.productList = result.Data);

        if (this.orderline.Id == -1) {
            this.orderline.Price = 0;
            this.orderline.Quantity = 0;
            this.orderline.Product = this.product;
        }

    //    if (this.orderlineID != -1)
     //       this.orderService.getOrderDetailById(this.orderlineID).then(result => this.orderline = result);
        this.ready = true;
    }

    addToDB(): void {this.ready = true;

      //  this.orderService.addToDB(this.orderline).subscribe();
        this.ready = true;
    }


    refreshReady(): void {
        this.ready = false;
    }
    calculatePrices(): void {
        this.orderline.TotalPriceWithoutDiscount = this.orderline.Quantity * this.orderline.Price;
    }
    done()
    {
        this.orderline.ProductId = this.product.Id;
        //this.orderline.Product = this.product;
        this.calculatePrices();
    }
}