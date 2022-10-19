import OrderRepository from "@Order/infrastructure/OrderRepository";
import Order from "@Order/domain/Order";
import MockOrderDTO from "@Order/infrastructure/Mock/DTO";

const orders = [];
class MockOrderRopository implements OrderRepository {
  find(): Promise<Order[]> {
    return Promise.resolve(MockOrderDTO.ordersMapper(orders));
  }
  save(order: Order): void {
    orders.push(order);
  }
  update(id: string, order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByOrderNumber(orderNumber: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

export default MockOrderRopository;
