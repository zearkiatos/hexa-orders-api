import Order from "@Order/domain/Order";
class MockOrderDTO {
  static ordersMapper(orders: any[]): Order[] {
    return orders as Order[];
  }
}

export default MockOrderDTO;
