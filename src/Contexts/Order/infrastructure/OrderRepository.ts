import Order from "@Order/domain/Order";

interface OrderRepository {
  find(): Promise<Order[]>;

  save(order: Order): void;

  update(id: string, order: Order): void;

  delete(id: string): void;

  findByOrderNumber(orderNumber: string): Promise<Order>;
}

export default OrderRepository;
