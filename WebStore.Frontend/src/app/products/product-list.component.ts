import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "./product";
import { ProductService } from "../services/ProductsService";
@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    providers: []
})
export class ProductsListComponent implements OnInit{
    maxPages: number = 2;
    filterValue: string;
    pageSize: number=10;
    pageNumber: number=0;
    discStart: number;
    discEnd: number;
    title: string;
    productList: Product[];
    current: Product;
    constructor(private service: ProductService, private router: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.title = "List of Products";
        this.filterValue = "";
        this.discStart = -1;
        this.discEnd = -1;
        this.getFilterPage();

    }
    getFilterPage() {
        this.service.getProductPage(this.pageNumber, this.pageSize, this.filterValue, this.discStart, this.discEnd).then(Products => (this.productList = Products.Data, this.maxPages = Products.Size));

    }
    refresh() {
        this.pageNumber = 0;
        this.filterValue = "";
        this.discStart = -1;
        this.discEnd = -1;
        this.getFilterPage();
    }
    apply()
    {
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
    
    delete(ProductId: number): void { 
        if(confirm("Are you sure u want to delete?"))
        this.service.delete(ProductId).subscribe(response => this.refresh(), error=>alert("cannot delete this item"));
       
    }
    /*
    view(id: number)
    {
        this.router.url('/Products/' + id);
    }*/

}