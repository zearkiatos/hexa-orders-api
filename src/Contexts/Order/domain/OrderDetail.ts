import Item from "@Order/domain/Item";
class OrderDetail {
    id?:string;
    item: Item;
    quantity:number;
    subtotal:number;
}

export default OrderDetail;