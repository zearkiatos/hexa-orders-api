import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderModel from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";
import GetOrders from "@Order/application/order/GetOrders";
import PostOrder from "@Order/application/order/PostOrder";

@Injection()
class Order implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(): Promise<any[]> {
    return [
        new GetOrders(this.orderRepository),
        new PostOrder(this.orderRepository)
    ];
  }
}

export default Order;