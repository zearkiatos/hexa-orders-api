import BaseBuilder from "@Builders/baseBuilder";
import ItemBuilder from "@Builders/itemBuilder";
import Item from "@Api/Contexts/Order/domain/Item";

class OrderDetailBuilder extends BaseBuilder {
  private id: string;
  private item: Item;
  private quantity: number;
  private subtotal: number;
  constructor() {
    super();
    this.id = "1";
    this.item = new ItemBuilder().build() as Item;
    this.quantity = 2;
    this.subtotal = this.item.price * this.quantity;
  }
}

export default OrderDetailBuilder;
