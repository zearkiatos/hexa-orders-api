import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderRepository from "@Order/infrastructure/OrderRepository";
import GetOrders from "@Order/application/order/GetOrders";
import PostOrder from "@Order/application/order/PostOrder";
import PutOrder from "@Order/application/order/PutOrder";
import DeleteOrder from "@Order/application/order/DeleteOrder";

@Injection()
class Order implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(): Promise<any[]> {
    return [
      new GetOrders(this.orderRepository),
      new PostOrder(this.orderRepository),
      new PutOrder(this.orderRepository),
      new DeleteOrder(this.orderRepository),
    ];
  }
}

export default Order;
