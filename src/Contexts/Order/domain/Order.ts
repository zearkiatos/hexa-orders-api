import Client from '@Order/domain/Client';
import OrderDetail from '@Order/domain/OrderDetail';

class Order {
    orderNumber:string;
    client:Client;
    OrderDetail:OrderDetail[];
    total:number;
}

export default Order;