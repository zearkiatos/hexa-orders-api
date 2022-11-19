import { Pool } from "mysql2/promise";
import OrderRepository from "@Order/infrastructure/OrderRepository";
import Order from "@Order/domain/Order";
import RepositoryErrorHandler from "@Api/Errors/RepositoryErrorHandler";
import { Logger } from "@Api/utils/logger";
import DataContext from "@Api/Contexts/Shared/infrastructure/dataContext";
import MySqlOrderDTO from "@Order/infrastructure/MySQL/DTO";

const log = Logger(__filename);

class MySQLOrderRepository implements OrderRepository {
  public async find(): Promise<Order[]> {
    try {
      const [rows]: any[] = await (DataContext.getContext() as Pool)
        .execute(`SELECT od.order_id, o.order_number, o.client_id, o.total, od.item_id, od.quantity, od.subtotal, i.sku, i.barcode, i.name, i.item_number, i.price, c.username, c.name, c.lastname, c.id_number, od.id as order_detail_id
      FROM orders as o INNER JOIN order_details as od ON (o.id = od.order_id)
      INNER JOIN items AS i ON (i.id = od.item_id)
      INNER JOIN clients AS c ON(c.id = o.client_id)`);
      console.log(rows);
      const orders = MySqlOrderDTO.OrdersMapper(rows);
      // const orders = await OrderModel.find();
      // return MongoOrderDTO.ordersMapper(orders);
      return orders;
    } catch (ex: any) {
      log.error(
        "Something was wrong in Mongo Order Repository when try to find the order list",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in Mongo Order Repository when try to find the order list: message ${ex.message}`
      );
    }
  }
  save(order: Order): void {
    console.log(order);
    throw new Error("Method not implemented.");
  }
  update(id: string, order: Order): void {
    console.log(order);
    console.log(id);
    throw new Error("Method not implemented.");
  }
  delete(id: string): void {
    console.log(id);
    throw new Error("Method not implemented.");
  }
  findByOrderNumber(orderNumber: string): Promise<Order> {
    console.log(orderNumber);
    throw new Error("Method not implemented.");
  }
}

export default MySQLOrderRepository;
