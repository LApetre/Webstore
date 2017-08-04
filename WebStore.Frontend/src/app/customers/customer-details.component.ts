import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from "rxjs";
import { Observable } from "rxjs/Rx";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Customer } from "./Customer";
import { CustomerService } from "../services/CustomersService";
@Component({
    selector: 'customer-details',
    templateUrl: './customer-details.component.html',
    providers: []
})
export class CustomerDetailsComponent implements OnInit {
    customer: Customer=new Customer();
    ready: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private customerService: CustomerService
    ) {
    }

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => {

                let id = params["id"];

                if ("new" == id) {
                    alert("Adding a new customer");
                    this.customer.Id = -1;
                } else {
                    alert("Editing customer with id " + id);

                    this.customerService.getCustomerById(id).then(customer => this.customer = customer);
                }

                return Observable.of<any>(id);
            })
            .subscribe((id: any) => {
            });
    }

    addToDB(): void {
        this.ready = true;
        this.customerService.addToDB(this.customer).subscribe();
    }



    refreshReady(): void {
        this.ready = false;
    }
    

}