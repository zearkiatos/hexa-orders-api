import MongoOrderRepository from "@Api/Contexts/Order/infrastructure/MongoDB/MongoOrderRepository";
import MongoDatabase from "@Api/Contexts/Database/infrastructure/MongoDatabase";
import OrderModel from "@Order/infrastructure/MongoDB/Schema/Order";
import OrderBuilder from "@Builders/orderBuilder";
import Order from "@Order/domain/Order";
import RepositoryErrorHandler from "@Api/Errors/RepositoryErrorHandler";

const mongoDatabase = new MongoDatabase();
const mongoOrderRepository = new MongoOrderRepository();

describe("Suite integration test for MongoOrderRepository", () => {
  beforeAll(async () => {
    await mongoDatabase.connection();
    await OrderModel.deleteMany({});
  });

  beforeEach(async () => {
    await OrderModel.deleteMany({});
    jest.restoreAllMocks();
  });

  afterAll(async () => {
    await OrderModel.deleteMany({});
    await mongoDatabase.close();
    jest.clearAllMocks();
  });
  test("Should get a list of orders", async () => {
    const order = new OrderBuilder().build();
    await OrderModel.create(order);

    const orders = await mongoOrderRepository.find();

    expect(orders).toBeDefined();
    expect(orders).toHaveLength(1);
    expect(orders[0].id).toEqual(order.id);
    expect(orders[0].client).toEqual(order.client);
    expect(orders[0].orderDetails[0]).toEqual(order.orderDetails[0]);
    expect(orders[0].orderNumber).toEqual(order.orderNumber);
    expect(orders[0].total).toEqual(order.total);
  });

  test("Should get a MongoOrderRepository handler error when exist some error", async () => {
    jest.spyOn(OrderModel, "find").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mongoOrderRepository.find();
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in Mongo Order Repository when try to find the order list: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should save an order a save into the mongo database", async () => {
    const order = new OrderBuilder().build();

    await mongoOrderRepository.save(order);
    const orderFound: any = await (
      await OrderModel.findOne({ id: order.id })
    ).toObject();

    expect(orderFound).toBeDefined();
    expect(orderFound.id).toEqual(order.id);
    expect(orderFound.client.name).toEqual(order.client.name);
    expect(orderFound.orderDetails[0].id).toEqual(order.orderDetails[0].id);
    expect(orderFound.orderNumber).toEqual(order.orderNumber);
    expect(orderFound.total).toEqual(order.total);
  });

  test("Should try to save and MongoOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    jest.spyOn(OrderModel, "create").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mongoOrderRepository.save(order);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in Mongo Order Repository when save an order: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should update an order an existed into the mongo database", async () => {
    const order = new OrderBuilder().build();
    await OrderModel.create(order);
    order.orderNumber = "2";

    await mongoOrderRepository.update(order.id, order);
    const orderFound: any = await (
      await OrderModel.findOne({ id: order.id })
    ).toObject();

    expect(orderFound).toBeDefined();
    expect(orderFound.orderNumber).toBe("2");
  });

  test("Should try to update and MongoOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    jest.spyOn(OrderModel, "updateOne").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mongoOrderRepository.update(order.id, order);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in Mongo Order Repository when try to update: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should delete an order for delete into the mongo database", async () => {
    const order = new OrderBuilder().build();
    await OrderModel.create(order);

    await mongoOrderRepository.delete(order.id);
    const orders: any = await await OrderModel.find();

    expect(orders).toBeDefined();
    expect(orders).toHaveLength(0);
  });

  test("Should try to delete and MongoOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    jest.spyOn(OrderModel, "deleteOne").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mongoOrderRepository.delete(order.id);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in Mongo Order Repository when try to delete: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should get a order by orderNumber into the mongo database", async () => {
    const order = new OrderBuilder().build();
    await OrderModel.create(order);

    const orderFound: any = await mongoOrderRepository.findByOrderNumber(
      order.orderNumber
    );

    expect(orderFound).toBeDefined();
    expect(orderFound.id).toEqual(order.id);
    expect(orderFound.client.name).toEqual(order.client.name);
    expect(orderFound.orderDetails[0].id).toEqual(order.orderDetails[0].id);
    expect(orderFound.orderNumber).toEqual(order.orderNumber);
  });

  test("Should try to find an orderby orderNumber and MongoOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    jest.spyOn(OrderModel, "findOne").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mongoOrderRepository.findByOrderNumber(order.id);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in Mongo Order Repository when try to find an order: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });
});
