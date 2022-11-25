import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderModel from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";

@Injection()
class PostOrder implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(order:OrderModel): Promise<void> {
    await this.orderRepository.save(order);
  }
}

export default PostOrder;