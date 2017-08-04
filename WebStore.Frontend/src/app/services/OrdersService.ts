import { Injectable } from '@angular/core';
import { Customer } from '../customers/Customer';
import { PageData } from '../PageData';
import { Headers, Http, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Order, OrderDetail } from '../orders/Order';
import { Product } from '../products/product';

@Injectable()
export class OrdersService {

    //http://localhost:10008
    private OrdersUrl = 'api/Orders/GetAll';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private countriesPageUrl: string;
    constructor(private http: Http) { }
    //blic PageData<Order> GetPage(int pageNumber, int pageSize, int customerId, decimal discountStart, decimal discountEnd, DateTime from, DateTime to) {
    getOrderPage(pageNumber: number, pageSize: number, cid: number, startDisc: number, endDisc: number, from: Date, to: Date): Promise<PageData<Order>> {
        return this.http.get(this.getPageUrl(pageNumber, pageSize, cid, startDisc, endDisc,from,to))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getPageUrl(pageNumber: number, pageSize: number, cid: number, startDisc: number, endDisc: number, from: Date, to: Date): string {
        return `api/Orders/GetPage?pageNumber=${pageNumber}&pageSize=${pageSize}&customerId=${cid}&discountStart=${startDisc}&discountEnd=${endDisc}&from=${from}&to=${to}`;
    }
    getUrl(id: number) {
        return `api/Orders/GetOrder?id=${id}`;
    }
    getDetailUrl(id: number) {
        return `api/OrderDetail/GetDetail?id=${id}`;
    }
    getOrderById(Id: number): Promise<Order> {
        return this.http.get(this.getUrl(Id))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    getOrderDetailById(Id: number): Promise<OrderDetail> {
        return this.http.get(this.getDetailUrl(Id))
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    addToDB(order: Order): Observable<Order> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = "api/Orders/PostOrder";

        return this.http
            .post(url, order)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(orderId: number): Observable<Order> {
        //  var countryJSON = JSON.stringify(country);
        let url: string = `api/Orders/DeleteOrder1/?cid=${orderId}`;
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