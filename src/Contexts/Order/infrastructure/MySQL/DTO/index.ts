import Order from "@Order/domain/Order";
import OrderDetail from "@Order/domain/OrderDetail";
class MySqlOrderDTO {
  static OrdersMapper(orders: any[]): Order[] {
    // const ordersMapped: Order[] = orders.map((order) => {
    //   return {
    //     id: String(order.order_id),
    //     orderNumber: order.order_number,
    //     client: {
    //       id: order.client_id,
    //       username: order.username,
    //       name: order.name,
    //       lastname: order.lastname,
    //       idNumber: order.id_number,
    //     },
    //     total: order.total,
    //   };
    // }) as Order[];
    const ordersMapped: Order[] = orders.reduce((accumulator, currentValue) => {
      const ordersFound = accumulator.filter(
        (accum) => accum.id === String(currentValue.order_id)
      );
      const accumulatorUpdated = accumulator;
      
      if (ordersFound.length > 0) {
        console.log(accumulatorUpdated);
        accumulatorUpdated.orderDetails.push({
          id: String(currentValue.order_detail_id),
          item: {
            id: String(currentValue.item_id),
            sku: currentValue.sku,
            barcode: currentValue.barcode,
            name: currentValue.name,
            itemNumber: currentValue.item_number,
            price: currentValue.price,
          },
        });
      } else {
        accumulatorUpdated.push({
          id: String(currentValue.order_id),
          orderNumber: currentValue.order_number,
          client: {
            id: String(currentValue.client_id),
            username: currentValue.username,
            name: currentValue.name,
            lastname: currentValue.lastname,
            idNumber: currentValue.id_number,
          },
          orderDetails: [
            {
              id: String(currentValue.order_detail_id),
              item: {
                id: String(currentValue.item_id),
                sku: currentValue.sku,
                barcode: currentValue.barcode,
                name: currentValue.name,
                itemNumber: currentValue.item_number,
                price: currentValue.price,
              },
            },
          ],
          total: currentValue.total,
        });
      }
      return accumulatorUpdated;
    }, []) as Order[];
    return ordersMapped;
  }
}

export default MySqlOrderDTO;
