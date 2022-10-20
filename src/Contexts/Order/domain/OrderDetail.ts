import Item from "@Order/domain/Item";
class OrderDetail {
    id?:string;
    item: Item;
    quantity:number;
    subTotal:number;
}

export default OrderDetail;