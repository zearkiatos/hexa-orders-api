import Order from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";

class MongoOrderRepository implements OrderRepository {
  find(): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  save(order: Order): void {
    throw new Error("Method not implemented.");
  }
  update(id: string, order: Order): void {
    throw new Error("Method not implemented.");
  }
  delete(id: string): void {
    throw new Error("Method not implemented.");
  }
  findByOrderNumber(orderNumber: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

export default MongoOrderRepository;
