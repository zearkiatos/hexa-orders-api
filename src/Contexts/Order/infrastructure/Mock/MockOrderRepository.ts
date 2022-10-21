import OrderRepository from "@Order/infrastructure/OrderRepository";
import Order from "@Order/domain/Order";
import MockOrderDTO from "@Order/infrastructure/Mock/DTO";
import keys from "@Utils/keys";

const orders = [];
class MockOrderRopository implements OrderRepository {
  find(): Promise<Order[]> {
    return Promise.resolve(MockOrderDTO.ordersMapper(orders));
  }
  save(order: Order): void {
    order.id = keys.createGuid();
    orders.push(order);
  }
  update(id: string, order: Order): Promise<void> {
    const orderIndex = orders.findIndex((order) => (order as Order).id == id);

    if (orderIndex == -1) {
      return null;
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      orderNumber: order.orderNumber,
      client: order.client,
      orderDetail: order.orderDetail,
      total: order.total,
    };
  }
  delete(id: string): void {
    const orderIndex = orders.findIndex((order) => (order as Order).id == id);
    delete orders[orderIndex];
  }
  findByOrderNumber(_orderNumber: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

export default MockOrderRopository;
