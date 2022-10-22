import BaseBuilder from "@Builders/baseBuilder";
import Client from "@Api/Contexts/Order/domain/Client";
import ClientBuilder from "@Builders/clientBuilder";
import OrderDetail from "@Api/Contexts/Order/domain/OrderDetail";
import OrderDetailBuilder from "@Builders/orderDetailBuilder";

class OrderBuilder extends BaseBuilder {
  private orderNumber: string;
  private client: Client;
  private orderDetails: OrderDetail[];
  private total: number;
  constructor() {
    super();
    this.orderNumber = "1";
    this.client = new ClientBuilder().build() as Client;
    this.orderDetails = [new OrderDetailBuilder().build() as OrderDetail];
    this.total = this.orderDetails.reduce(
      (previousValue, { subTotal }) => previousValue + subTotal,
      0
    );
  }
}

export default OrderBuilder;
