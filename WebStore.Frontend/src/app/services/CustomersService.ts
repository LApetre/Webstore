import { Injectable } from '@angular/core';
import { Customer } from '../customers/Customer';
import { PageData } from '../PageData';
//import { PageData } from '../models/PageData';
import { Headers, Http, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CustomerService {

    private CustomersUrl = 'api/Customers/GetAll';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private countriesPageUrl: string;
    constructor(private http: Http) { }

    getCustomerPage(pageNumber: number, pageSize: number,filterName:string,startDisc:number,endDisc:number): Promise<PageData<Customer>> {
        return this.http.get(this.getPageUrl(pageNumber, pageSize, filterName, startDisc, endDisc))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getPageUrl(pageNumber: number, pageSize: number, filterName: string, startDisc: number, endDisc: number): string {
        return `api/Customers/GetPage?pageNumber=${pageNumber}&pageSize=${pageSize}&nameFilter=${filterName}&discountStart=${startDisc}&discountEnd=${endDisc}`;
    }
    getUrl(id: number)
    {
        return `api/Customers/GetCustomer?id=${id}`;
    }
    getCustomerById(Id: number): Promise<Customer>
    {
        return this.http.get(this.getUrl(Id))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getAll(): Promise<Customer[]> {
        return this.http.get('api/Customers/GetAllCustomers')
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    addToDB(customer: Customer): Observable<Customer> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = "api/Customers/PostCustomer";

        return this.http
            .post(url, customer)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(customerId: number): Observable<Customer> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = `api/Customers/DeleteCustomer1/?cid=${customerId}`;
        /*let body = JSON.stringify({
            cid: targetId,
        });*/
        return this.http
            .delete(url)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || "";
            const err = JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}