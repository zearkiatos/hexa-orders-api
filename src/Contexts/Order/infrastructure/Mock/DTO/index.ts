import Order from "@Order/domain/Order";
class MockOrderDTO {
  static ordersMapper(orders: any[]): Order[] {
    return orders as Order[];
  }

  static orderMapper(order: any): Order {
    return order as Order;
  }
}

export default MockOrderDTO;
