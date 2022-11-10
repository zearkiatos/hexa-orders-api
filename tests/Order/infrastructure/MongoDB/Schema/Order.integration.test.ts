import mongoose from "mongoose";
import Order from "@Order/infrastructure/MongoDB/Schema/Order";
import config from "@Config/index";
describe("Suite Integration test for Order mongo Schema", () => {
  beforeAll(async () => {
      console.log(config.MONGO_DATABASE_URI);
      await mongoose.connect(config.MONGO_DATABASE_URI);
  });

  afterAll(async () => {
    // await mongoose.disconnect();
    // done();
  });
  test("Should persist the order into the database", (done) => {
    // const orders = Order.find();
    // console.log(orders);
    done();
  });
});
