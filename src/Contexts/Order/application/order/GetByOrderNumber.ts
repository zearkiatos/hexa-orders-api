import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderModel from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";

@Injection()
class GetByOrderNumber implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(orderNumber: string): Promise<OrderModel> {
    const order: OrderModel = await this.orderRepository.findByOrderNumber(
      orderNumber
    );

    return order;
  }
}

export default GetByOrderNumber;
