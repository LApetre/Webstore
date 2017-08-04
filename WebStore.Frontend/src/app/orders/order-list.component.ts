import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Order, OrderDetail } from "../orders/order";
import { OrdersService } from "../services/OrdersService";
import { CustomerService } from "../services/CustomersService";
import { Customer } from '../customers/Customer';
@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    providers: []
})
export class OrderListComponent implements OnInit{
    maxPages: number = 2;
    pageSize: number=10;
    pageNumber: number=0;
    discStart: number=0;
    discEnd: number=100;
    from: Date = null;
    to: Date = null;
    title: string;
    orderList: Order[];
    customerList: Customer[];
    current: Order;
    customer: Customer = new Customer();
    customerId: number;
    constructor(private serviceOrder: OrdersService,private serviceCustomers:CustomerService, private router: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.title = "List of Orders";
        this.discStart = -1;
        this.discEnd = -1;
        this.customerId = -1;
        this.getCustomers();
        this.getFilterPage();

    }
    getCustomers() {
        this.serviceCustomers
            .getCustomerPage(0,100,"",0,100)
            .then(result => (this.customerList = result.Data));

    }

    getFilterPage()
    {
        this.serviceOrder
            .getOrderPage(this.pageNumber, this.pageSize, this.customerId, this.discStart, this.discEnd, this.from, this.to)
            .then(result =>( this.orderList = result.Data, this.maxPages=result.Size));
    }
    refresh() {
        this.pageNumber = 0;
        this.getFilterPage();
    }
    next(): void {
        this.pageNumber += 1;
        this.getFilterPage();
    }
    prev(): void {
        this.pageNumber -= 1;
        this.getFilterPage();
    }

    delete(OrderId: number): void {
        if (confirm("Are you sure u want to delete?")) {
            this.serviceOrder.delete(OrderId).subscribe();
            this.refresh();
        }
    }

    /*
    view(id: number)
    {
        this.router.url('/Orders/' + id);
    }*/

}