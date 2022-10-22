import MockOrderRopository from "@Api/Contexts/Order/infrastructure/Mock/MockOrderRepository";
import OrderRepository from "@Api/Contexts/Order/infrastructure/OrderRepository";
import Order from "@Api/Contexts/Order/domain/Order";
class OrderRepositoryMocked {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new MockOrderRopository();
  }

  async find(): Promise<Order[]> {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async save(order: Order): Promise<void> {
    await this.orderRepository.save(order);
  }
}

export default OrderRepositoryMocked;
