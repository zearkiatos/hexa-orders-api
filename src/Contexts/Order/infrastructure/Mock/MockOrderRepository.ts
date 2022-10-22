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
      orderDetails: order.orderDetails,
      total: order.total,
    };
  }
  delete(id: string): void {
    const orderIndex = orders.findIndex((order) => (order as Order).id == id);
    delete orders[orderIndex];
  }

  findByOrderNumber(orderNumber: string): Promise<Order> {
    const order: Order = orders.find(
      (order) => (order as Order).orderNumber == orderNumber
    );

    if (order) {
      return Promise.resolve(order);
    }

    return null;
  }
}

export default MockOrderRopository;
