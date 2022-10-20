import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderModel from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";

@Injection()
class GetOrders implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(): Promise<OrderModel[]> {
    const orders: OrderModel[] = await this.orderRepository.find();

    return orders;
  }
}

export default GetOrders;
