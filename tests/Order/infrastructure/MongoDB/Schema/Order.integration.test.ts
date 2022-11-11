import MongoDatabase from "@Api/Contexts/Database/infrastructure/MongoDatabase";
import OrderBuilder from "@Builders/orderBuilder";
import Order from "@Order/infrastructure/MongoDB/Schema/Order";

const mongoDatabase = new MongoDatabase();

describe("Suite Integration test for Order mongo Schema", () => {
  beforeAll(async () => {
    await mongoDatabase.connection();
    await Order.deleteMany({});
    
  });

  afterAll(async () => {
    await Order.deleteMany({});
    await mongoDatabase.close();
    
  });
  test("Should persist the order into the database", async () => {
    const order = new OrderBuilder().build();

    await Order.create(order);
    const orderResult: any = await Order.findOne({
      orderNumber: order.orderNumber,
    });

    expect(order.orderNumber).toBe(orderResult.orderNumber);
    
  });
});
