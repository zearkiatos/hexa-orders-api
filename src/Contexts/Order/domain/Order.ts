import Client from '@Order/domain/Client';
import OrderDetail from '@Order/domain/OrderDetail';

class Order {
    id?:string;
    orderNumber:string;
    client:Client;
    orderDetails:OrderDetail[];
    total:number;
}

export default Order;