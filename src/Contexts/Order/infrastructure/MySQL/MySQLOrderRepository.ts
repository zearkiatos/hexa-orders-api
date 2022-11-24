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
        .execute(`SELECT od.order_id, o.order_number, o.client_id, o.total, od.item_id, od.quantity, od.subtotal, i.sku, i.barcode, i.name, i.item_number, i.price, c.username, c.name, c.lastname, c.id_number, od.id as order_detail_id, i.name as item_name
      FROM orders as o INNER JOIN order_details as od ON (o.id = od.order_id)
      INNER JOIN items AS i ON (i.id = od.item_id)
      INNER JOIN clients AS c ON(c.id = o.client_id)`);
      const orders = MySqlOrderDTO.OrdersMapper(rows);
      return orders;
    } catch (ex: any) {
      log.error(
        "Something was wrong in MySql Order Repository when try to find the order list",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in MySql Order Repository when try to find the order list: message ${ex.message}`
      );
    }
  }
  public async save(order: Order): Promise<void> {
    try {
      const context: Pool = DataContext.getContext() as Pool;
      await context.execute(
        `INSERT INTO orders(order_number, client_id, total) VALUES("${order.orderNumber}", "${order.client.id}", "${order.total}")`
      );

      const [rows]: any[] = await context.execute(
        `SELECT o.id FROM orders AS o WHERE o.order_number = "${order.orderNumber}"`
      );
      for (const orderDetail of order.orderDetails) {
        await context.execute(
          `INSERT INTO order_details(item_id, order_id, quantity, subtotal) VALUES(${orderDetail.item.id}, ${rows[0].id}, ${orderDetail.quantity}, ${orderDetail.subtotal})`
        );
      }
    } catch (ex: any) {
      log.error(
        "Something was wrong in MySql Order Repository when save an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in MySql Order Repository when save an order: message ${ex.message}`
      );
    }
  }
  public async update(id: string, order: Order): Promise<void> {
    try {
      const context: Pool = DataContext.getContext() as Pool;
      await context.execute(
        `UPDATE orders SET order_number="${
          order.orderNumber
        }", client_id=${parseInt(order.client.id)}, total=${
          order.total
        } WHERE id=${parseInt(id)}`
      );
      for (const orderDetail of order.orderDetails)
        await context.execute(
          `UPDATE order_details SET item_id=${parseInt(
            orderDetail.item.id
          )}, quantity=${orderDetail.quantity}, subtotal=${
            orderDetail.subtotal
          } WHERE order_id=${id}`
        );
    } catch (ex: any) {
      log.error(
        "Something was wrong in MySql Order Repository when try to update an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in MySql Order Repository when try to update an order: message ${ex.message}`
      );
    }
  }
  public async delete(id: string): Promise<void> {
    try {
      const context: Pool = DataContext.getContext() as Pool;
      await context.execute(
        `DELETE FROM order_details WHERE order_id=${parseInt(id)}`
      );

      await context.execute(`DELETE FROM orders WHERE id=${parseInt(id)}`);
    } catch (ex: any) {
      log.error(
        "Something was wrong in MySql Order Repository when try to delete an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in MySql Order Repository when try to delete an order: message ${ex.message}`
      );
    }
  }
  public async findByOrderNumber(orderNumber: string): Promise<Order> {
    try {
      const context: Pool = DataContext.getContext() as Pool;
      const [rows]: any[] = await context.execute(
        `SELECT od.order_id, o.order_number, o.client_id, o.total, od.item_id, od.quantity, od.subtotal, i.sku, i.barcode, i.name, i.item_number, i.price, c.username, c.name, c.lastname, c.id_number, od.id as order_detail_id, i.name as item_name
      FROM orders as o INNER JOIN order_details as od ON (o.id = od.order_id)
      INNER JOIN items AS i ON (i.id = od.item_id)
      INNER JOIN clients AS c ON(c.id = o.client_id) WHERE o.order_number = ${orderNumber}`
      );

      const orderFound: Order = MySqlOrderDTO.OrderMapper(rows);

      return orderFound;
    } catch (ex: any) {
      log.error(
        "Something was wrong in MySql Order Repository when try to find an order by orderNumber an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in MySql Order Repository when try to find an order by orderNumber message ${ex.message}`
      );
    }
  }
}

export default MySQLOrderRepository;
