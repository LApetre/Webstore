import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Product } from "./product";
import { ProductService } from "../services/ProductsService";
@Component({
    selector: 'product-details',
    templateUrl: './product-details.component.html',
    providers: []
})
export class ProductDetailsComponent implements OnInit {
    product: Product=new Product();
    ready: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {

                let id = params["id"];

                if ("new" == id) {
                    alert("Adding a new product");
                    this.product.Id = -1;
                } else {
                    alert("Editing product with id " + id);

                    this.productService.getProductById(id).then(product => this.product = product);
                }

                return Observable.of<any>(id);
            })
            .subscribe((id: any) => {
            });
    }

    addToDB(): void {

        this.productService.addToDB(this.product).subscribe();
        this.ready = true;
    }



    refreshReady(): void {
        this.ready = false;
    }
    

}