import { Pool } from "mysql2/promise";
import MySQLOrderRepository from "@Api/Contexts/Order/infrastructure/MySQL/MySQLOrderRepository";
import MySQLDatabase from "@Api/Contexts/Database/infrastructure/MySQLDatabase";
import OrderBuilder from "@Builders/orderBuilder";
import OrderDetailBuilder from "@Builders/orderDetailBuilder";
import ItemBuilder from "@Builders/itemBuilder";
import ClientBuilder from "@Builders/clientBuilder";
import DataContext from "@Api/Contexts/Shared/infrastructure/dataContext";
import RepositoryErrorHandler from "@Api/Errors/RepositoryErrorHandler";
import MySqlOrderDTO from "@Api/Contexts/Order/infrastructure/MySQL/DTO";

const mySqlDatabase = new MySQLDatabase();
const mySqlOrderRepository = new MySQLOrderRepository();
let context: Pool = null;

describe("Suite integration test for MySQLOrderRepository", () => {
  beforeAll(async () => {
    await mySqlDatabase.connection();
    context = mySqlDatabase.getDatabaseContext();
    await clearMockData();
  });

  beforeEach(async () => {
    await clearMockData();
    jest.restoreAllMocks();
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

    expect(orders).toBeDefined();
    expect(orders).toHaveLength(1);
    expect(orders[0].id).toEqual(order.id);
    expect(orders[0].client).toEqual(order.client);
    expect(orders[0].orderNumber).toEqual(order.orderNumber);
    expect(orders[0].total).toEqual(order.total);
  });

  test("Should get a MySqlOrderRepository handler error when exist some error", async () => {
    jest.spyOn(DataContext, "getContext").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mySqlOrderRepository.find();
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in MySql Order Repository when try to find the order list: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should save an order a save into the mysql database", async () => {
    const order = new OrderBuilder().build();
    const client = new ClientBuilder().build();
    const item = new ItemBuilder().build();
    await loadClientMock(client, 1);
    await loadItemMock(item, 1);
    await mySqlOrderRepository.save(order);
    const [rows]: any[] = await context.execute(`SELECT od.order_id, o.order_number, o.client_id, o.total, od.item_id, od.quantity, od.subtotal, i.sku, i.barcode, i.name, i.item_number, i.price, c.username, c.name, c.lastname, c.id_number, od.id as order_detail_id, i.name as item_name
    FROM orders as o INNER JOIN order_details as od ON (o.id = od.order_id)
    INNER JOIN items AS i ON (i.id = od.item_id)
    INNER JOIN clients AS c ON(c.id = o.client_id) WHERE o.order_number = "${order.orderNumber}"`);
    const orderFound = MySqlOrderDTO.OrderMapper(rows);

    expect(orderFound).toBeDefined();
    expect(orderFound.id).toEqual(order.id);
    expect(orderFound.client.name).toEqual(order.client.name);
    expect(orderFound.orderDetails[0].subtotal).toEqual(order.orderDetails[0].subtotal);
    expect(orderFound.orderDetails[0].item.name).toEqual(order.orderDetails[0].item.name);
    expect(orderFound.orderNumber).toEqual(order.orderNumber);
    expect(orderFound.total).toEqual(order.total);
  });

  test("Should try to save and MySqlOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    jest.spyOn(DataContext, "getContext").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mySqlOrderRepository.save(order);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in MySql Order Repository when save an order: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should update an order that existed into the mysql database", async () => {
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
    order.orderNumber = "00001";

    await mySqlOrderRepository.update("1",order);
    const [rows]:any[] = await context.execute("SELECT order_number FROM orders WHERE id=1");
    const orderFound = MySqlOrderDTO.OrderMapper(rows);

    expect(orderFound).toBeDefined();
    expect(orderFound.orderNumber).toBe(order.orderNumber);
  });

  test("Should try to update and MySQLOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    await loadMockData(order);
    jest.spyOn(DataContext, "getContext").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mySqlOrderRepository.update("1", order);
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in MySql Order Repository when try to update an order: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
  });

  test("Should delete an order that existed into the mysql database", async () => {
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

    await mySqlOrderRepository.delete("1");
    const [rows]:any[] = await context.execute("SELECT order_number FROM orders WHERE id=1");

    expect(rows).toBeDefined();
    expect(rows).toHaveLength(0);
  });

  test("Should try to delete and MySQLOrderRepository handler error when exist some error", async () => {
    const order = new OrderBuilder().build();
    await loadMockData(order);
    jest.spyOn(DataContext, "getContext").mockImplementation(() => {
      throw new Error("Something was wrong 🤯");
    });

    try {
      await mySqlOrderRepository.delete("1");
    } catch (ex: any) {
      expect(ex.message).toBe(
        "Something was wrong in MySql Order Repository when try to delete an order: message Something was wrong 🤯"
      );
      expect(ex instanceof RepositoryErrorHandler).toBeTruthy();
    }
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

const loadClientMock = async (client, id) => {
  await context.execute(
    `INSERT INTO clients(id, username, name, lastname, id_number) VALUES(${id}, "${client.username}", "${client?.name}", "${client?.lastname}", "${client?.idNumber}")`
  );
};

const loadItemMock = async (item, id) => {
  await context.execute(
    `INSERT INTO items(id, sku, barcode, item_number, price, name) VALUES(${id}, "${item.sku}","${item.barcode}", "${item.itemNumber}", ${item.price}, "${item.name}")`
  );
};

const clearMockData = async () => {
  await context.execute("DELETE FROM clients");
  await context.execute("DELETE FROM items");
  await context.execute("DELETE FROM order_details");
  await context.execute("DELETE FROM orders");
  await context.execute("ALTER TABLE clients AUTO_INCREMENT = 1");
  await context.execute("ALTER TABLE items AUTO_INCREMENT = 1");
  await context.execute("ALTER TABLE order_details AUTO_INCREMENT = 1");
  await context.execute("ALTER TABLE orders AUTO_INCREMENT = 1");
};
