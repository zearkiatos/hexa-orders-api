import { Pool } from "mysql2/promise";
import MySQLOrderRepository from "@Api/Contexts/Order/infrastructure/MySQL/MySQLOrderRepository";
import MySQLDatabase from "@Api/Contexts/Database/infrastructure/MySQLDatabase";
import OrderBuilder from "@Builders/orderBuilder";
import OrderDetailBuilder from "@Builders/orderDetailBuilder";
import ItemBuilder from "@Builders/itemBuilder";

const mySqlDatabase = new MySQLDatabase();
const mySqlOrderRepository = new MySQLOrderRepository();
let context: Pool = null;

describe("Suite integration test for MySQLOrderRepository", () => {
  beforeAll(async () => {
    await mySqlDatabase.connection();
    context = mySqlDatabase.getDatabaseContext();
    await clearMockData();
  });

  afterAll(async () => {
    await clearMockData();
    await mySqlDatabase.close();
    jest.clearAllMocks();
  });

  test("Should get a list of orders", async () => {
    const order = new OrderBuilder()
      .withParam("orderDetails", [
        new OrderDetailBuilder().build(),
        new OrderDetailBuilder()
          .withParam("id", 2)
          .withParam(
            "item",
            new ItemBuilder()
              .withParam("id", 2)
              .withParam("sku", "2")
              .withParam("barcode", "2")
              .withParam("itemNumber", "2")
              .withParam("price", 100)
              .withParam("name", "Shirt")
              .build()
          )
          .withParam("quantity", 1)
          .build(),
      ])
      .build();
    await loadMockData(order);

    const orders = await mySqlOrderRepository.find();

    console.log(orders);

    expect(orders).toBeDefined();
    // expect(orders).toHaveLength(1);
    // expect(orders[0].id).toEqual(order.id);
    // expect(orders[0].client).toEqual(order.client);
    // expect(orders[0].orderDetails[0]).toEqual(order.orderDetails[0]);
    // expect(orders[0].orderNumber).toEqual(order.orderNumber);
    // expect(orders[0].total).toEqual(order.total);
  });
});

const loadMockData = async (order: any) => {
  for (const orderDetail of order.orderDetails) {
    await context.execute(
      `INSERT INTO items(id, sku, barcode, item_number, price, name) VALUES("${orderDetail.id}", "${orderDetail.item.sku}","${orderDetail.item.barcode}", "${orderDetail.item.itemNumber}", ${orderDetail.item.price}, "${orderDetail.item.name}")`
    );
    await context.execute(
      `INSERT INTO order_details(id, item_id, order_id, quantity, subtotal) VALUES(${parseInt(orderDetail.item.id)}, ${orderDetail.item.id}, 1, ${orderDetail.quantity}, ${orderDetail.subtotal})`
    );
  }

  await context.execute(
    `INSERT INTO clients(id, username, name, lastname, id_number) VALUES(1, "${order.client?.username}", "${order.client?.name}", "${order.client?.lastname}", "${order.client?.idNumber}")`
  );
  await context.execute(
    `INSERT INTO orders(id, order_number, client_id, total) VALUES(1,"${order.orderNumber}", "${order.client.id}", "${order.total}")`
  );
};

const clearMockData = async () => {
  await context.execute("DELETE FROM clients");
  await context.execute("DELETE FROM items");
  await context.execute("DELETE FROM order_details");
  await context.execute("DELETE FROM orders");
};
