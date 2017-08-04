import { Customer } from '../customers/Customer';
import { Product } from '../products/product';

export class OrderDetail {
    Id: number;
    OrderId: number;
    ProductId: number;
    Product: Product;
    Price: number;
    Quantity: number;
    TotalPriceWithoutDiscount: number;
    TotalPrice: number;

}
export class Order {
    Id: number;
    DiscountPercent: number;
    OrderDate: Date;
    CustomerId: number;
    Customer: Customer; 
    OrderLines: OrderDetail[];

}

