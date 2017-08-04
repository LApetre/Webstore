import { Injectable } from '@angular/core';
import { Product } from '../products/product';
import { PageData } from '../PageData';
//import { PageData } from '../models/PageData';
import { Headers, Http, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ProductService {

    //http://localhost:10008
    private ProductsUrl = 'api/Products/GetAll';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private countriesPageUrl: string;
    constructor(private http: Http) { }

    getProductPage(pageNumber: number, pageSize: number,filterName:string,startDisc:number,endDisc:number): Promise<PageData<Product>> {
        return this.http.get(this.getPageUrl(pageNumber, pageSize, filterName, startDisc, endDisc))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getPageUrl(pageNumber: number, pageSize: number, filterName: string, startDisc: number, endDisc: number): string {
        return `api/Products/GetPage?pageNumber=${pageNumber}&pageSize=${pageSize}&nameFilter=${filterName}&priceStart=${startDisc}&priceEnd=${endDisc}`;
    }
    getUrl(id: number)
    {
        return `api/Products/GetProduct?id=${id}`;
    }
    getProductById(Id: number): Promise<Product>
    {
        return this.http.get(this.getUrl(Id))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    addToDB(Product: Product): Observable<Product> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = "api/Products/PostProduct";

        return this.http
            .post(url, Product)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(ProductId: number): Observable<Product> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = `api/Products/DeleteProduct1/?cid=${ProductId}`;
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