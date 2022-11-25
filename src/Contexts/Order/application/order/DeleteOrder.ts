import Service from "@Api/Contexts/Shared/application/Service";
import { Inject, Injection } from "@Api/utils/dependencyInjection";
import OrderRepository from "@Order/infrastructure/OrderRepository";

@Injection()
class DeleteOrder implements Service {
  private orderRepository: OrderRepository;

  constructor(@Inject("OrderRepository") orderRepository: OrderRepository) {
    this.orderRepository = orderRepository;
  }
  async run(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}

export default DeleteOrder;
