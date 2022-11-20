import Order from "@Order/domain/Order";
class MySqlOrderDTO {
  static OrdersMapper(orders: any[]): Order[] {
    const ordersMapped: Order[] = orders.reduce((accumulator, currentValue) => {
      const index = accumulator.findIndex(
        (accum) => accum.id === String(currentValue.order_id)
      );
      const order = {
        id: String(currentValue.order_id),
        orderNumber: currentValue.order_number,
        client: {
          id: String(currentValue.client_id),
          username: currentValue.username,
          name: currentValue.name,
          lastname: currentValue.lastname,
          idNumber: currentValue.id_number,
        },
        total: currentValue.total,
        orderDetails: [],
      };
      const accumulatorUpdated = accumulator;

      if (index > -1) {
        accumulatorUpdated[index].orderDetails.push({
          id: String(currentValue.order_detail_id),
          item: {
            id: String(currentValue.item_id),
            sku: currentValue.sku,
            barcode: currentValue.barcode,
            name: currentValue.item_name,
            itemNumber: currentValue.item_number,
            price: currentValue.price,
          },
        });
      } else {
        accumulatorUpdated.push({
          ...order,
          orderDetails: [
            {
              id: String(currentValue.order_detail_id),
              item: {
                id: String(currentValue.item_id),
                sku: currentValue.sku,
                barcode: currentValue.barcode,
                name: currentValue.item_name,
                itemNumber: currentValue.item_number,
                price: currentValue.price,
              },
            },
          ],
        });
      }
      return accumulatorUpdated;
    }, []) as Order[];
    return ordersMapped;
  }
}

export default MySqlOrderDTO;
