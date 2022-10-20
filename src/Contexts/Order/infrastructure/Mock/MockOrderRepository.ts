import OrderRepository from "@Order/infrastructure/OrderRepository";
import Order from "@Order/domain/Order";
import MockOrderDTO from "@Order/infrastructure/Mock/DTO";
import keys from '@Utils/keys';

const orders = [];
class MockOrderRopository implements OrderRepository {
  find(): Promise<Order[]> {
    return Promise.resolve(MockOrderDTO.ordersMapper(orders));
  }
  save(order: Order): void {
    order.id = keys.createGuid();
    orders.push(order);
  }
  update(_id: string, _order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  findByOrderNumber(_orderNumber: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

export default MockOrderRopository;
