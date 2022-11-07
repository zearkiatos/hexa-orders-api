import BaseBuilder from "@Builders/baseBuilder";

class ItemBuilder extends BaseBuilder {
  private id: string;
  private sku: string;
  private barcode: string;
  private itemNumber: string;
  private price: number;
  constructor() {
    super();
    this.id = "1";
    this.sku = "1";
    this.barcode = "1";
    this.itemNumber = "1";
    this.price = 200;
  }
}

export default ItemBuilder;
