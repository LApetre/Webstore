import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Customer } from "./Customer";
import { CustomerService } from "../services/CustomersService";
@Component({
    selector: 'customers-list',
    templateUrl: './customers-list.component.html',
    providers: []
})
export class CustomersListComponent implements OnInit{
    maxPages: number = 2;
    filterValue: string;
    pageSize: number=10;
    pageNumber: number=0;
    discStart: number;
    discEnd: number;
    title: string;
    customerList: Customer[];
    current: Customer;
    constructor(private service: CustomerService, private router: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.title = "List of customers";
        this.filterValue = "";
        this.discStart = -1;
        this.discEnd = -1;
        this.getFilterPage();

    }
    getFilterPage() {
        this.service.getCustomerPage(this.pageNumber, this.pageSize, this.filterValue, this.discStart, this.discEnd).then(customers => (this.customerList = customers.Data, this.maxPages = customers.Size));

    }
    refresh() {
        this.pageNumber = 0;
        this.filterValue = "";
        this.discStart = -1;
        this.discEnd = -1;
        this.getFilterPage();
    }
    apply() {
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

    delete(customerId: number): void {
        if (confirm("Are you sure u want to delete?"))
        this.service.delete(customerId).subscribe(response => this.refresh(), error => alert("cannot delete this item"));
    }
    /*
    view(id: number)
    {
        this.router.url('/customers/' + id);
    }*/

}