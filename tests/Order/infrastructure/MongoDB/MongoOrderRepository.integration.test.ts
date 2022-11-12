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
});
