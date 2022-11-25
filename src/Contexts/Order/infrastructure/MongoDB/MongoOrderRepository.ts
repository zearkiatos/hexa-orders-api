import Order from "@Order/domain/Order";
import OrderRepository from "@Order/infrastructure/OrderRepository";
import OrderModel from "@Order/infrastructure/MongoDB/Schema/Order";
import RepositoryErrorHandler from "@Api/Errors/RepositoryErrorHandler";
import MongoOrderDTO from "@Order/infrastructure/MongoDB/DTO";
import { Logger } from "@Api/utils/logger";

const log = Logger(__filename);

class MongoOrderRepository implements OrderRepository {
  public async find(): Promise<Order[]> {
    try {
      const orders = await OrderModel.find();
      return MongoOrderDTO.ordersMapper(orders);
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
  public async save(order: Order): Promise<void> {
    try {
      await OrderModel.create(order);
    } catch (ex: any) {
      log.error(
        "Something was wrong in Mongo Order Repository when save an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in Mongo Order Repository when save an order: message ${ex.message}`
      );
    }
  }
  public async update(id: string, order: Order): Promise<void> {
    try {
      await OrderModel.updateOne(
        { id },
        {
          $set: order,
        }
      );
    } catch (ex: any) {
      log.error(
        "Something was wrong in Mongo Order Repository when try to update",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in Mongo Order Repository when try to update: message ${ex.message}`
      );
    }
  }
  public async delete(id: string): Promise<void> {
    try {
      await OrderModel.deleteOne({ id });
    } catch (ex: any) {
      log.error(
        "Something was wrong in Mongo Order Repository when try to delete",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in Mongo Order Repository when try to delete: message ${ex.message}`
      );
    }
  }
  public async findByOrderNumber(orderNumber: string): Promise<Order> {
    try {
      const order = await OrderModel.findOne({ orderNumber });
      return MongoOrderDTO.orderMapper(order);
    } catch (ex: any) {
      log.error(
        "Something was wrong in Mongo Order Repository when try to find an order",
        {
          errorMessage: ex.message,
          stack: ex.stack,
        }
      );
      throw new RepositoryErrorHandler(
        `Something was wrong in Mongo Order Repository when try to find an order: message ${ex.message}`
      );
    }
  }
}

export default MongoOrderRepository;
