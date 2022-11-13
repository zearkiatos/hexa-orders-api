import Order from "@Order/domain/Order";
class MongoOrderDTO {
  static ordersMapper(orders: any[]): Order[] {
    const orderMapped = orders.map((order) => {
      const { id, orderNumber, client, orderDetails, total } = order;
      const { id: clientId, username, name, lastname, idNumber } = client;
      return {
        id,
        orderNumber,
        total,
        client: {
          id: clientId,
          username,
          name,
          lastname,
          idNumber,
        },
        orderDetails: orderDetails.map((orderDetail) => {
          const { id: orderDetailId, item, quantity, subtotal } = orderDetail;
          const { id: itemId, sku, barcode, itemNumber, price } = item;

          return {
            id: orderDetailId,
            item: {
              id: itemId,
              sku,
              barcode,
              itemNumber,
              price,
            },
            quantity,
            subtotal,
          };
        }),
      };
    });
    return orderMapped as Order[];
  }

  static orderMapper(order: any): Order {
    const { id, orderNumber, client, orderDetails, total } = order;
    const { id: clientId, username, name, lastname, idNumber } = client;
    return {
      id,
      orderNumber,
      total,
      client: {
        id: clientId,
        username,
        name,
        lastname,
        idNumber,
      },
      orderDetails: orderDetails.map((orderDetail) => {
        const { id: orderDetailId, item, quantity, subtotal } = orderDetail;
        const { id: itemId, sku, barcode, itemNumber, price } = item;

        return {
          id: orderDetailId,
          item: {
            id: itemId,
            sku,
            barcode,
            itemNumber,
            price,
          },
          quantity,
          subtotal,
        };
      }),
    };
  }
}

export default MongoOrderDTO;
