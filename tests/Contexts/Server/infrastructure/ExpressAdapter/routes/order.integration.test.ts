import supertest from "supertest";
import httpStatus from "http-status-codes";
import Api from "@Api/Api";
import config from "@Config/env/config";
import OrderBuilder from "@Builders/orderBuilder";
import ClientBuilder from "@Builders/clientBuilder";
import MockOrderRepository from "@Api/Contexts/Order/infrastructure/Mock/MockOrderRepository";
// import OrderRepositoryMocked from "@Mocks/MockOrderRepositoryMock";
import keys from "@Utils/keys";
// jest.mock("@Api/Contexts/Order/infrastructure/Mock/MockOrderRepository");

const api = new Api();

describe("Test suite for express adapter for orders", () => {
  beforeAll(async () => {
    await api.start();
    ;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await api.stop();
    jest.clearAllMocks();
    ;
  });
  test("Should get status 200 and get a order list", async () => {
    const response = await supertest(`http://localhost:${config.PORT}`).get(
      "/orders"
    );

    expect(response.status).toBe(httpStatus.OK);
    ;
  });

  test("Should get status save a new order", async () => {
    const orderMock = new OrderBuilder().build();
    jest.spyOn(keys, "createGuid").mockReturnValue("1000");
    await supertest(`http://localhost:${config.PORT}`)
      .post("/orders")
      .send(orderMock);

    const responseGet = await supertest(`http://localhost:${config.PORT}`).get(
      "/orders/1"
    );

    expect(responseGet.status).toBe(httpStatus.OK);
    expect(responseGet.body.id).toBe("1000");
    ;
  });

  test("Should update a existed order", async () => {
    const orderMockBase = new OrderBuilder()
      .withParam("orderNumber", "2")
      .withParam("id", "2");
    const orderMock = orderMockBase.build();
    const orderUpdated = orderMockBase
      .withParam("id", "1002")
      .withParam(
        "client",
        new ClientBuilder().withParam("name", "Jose").build()
      )
      .build();
    jest.spyOn(keys, "createGuid").mockReturnValue("1002");
    await supertest(`http://localhost:${config.PORT}`)
      .post("/orders")
      .send(orderMock);

    const response = await supertest(`http://localhost:${config.PORT}`)
      .put("/orders/1002")
      .send(orderUpdated);

    const responseGet = await supertest(`http://localhost:${config.PORT}`).get(
      "/orders/2"
    );

    expect(response.status).toBe(httpStatus.OK);
    expect(responseGet.body.id).toBe("1002");
    expect(responseGet.body.client.name).toBe("Jose");
    ;
  });

  test("Should delete an order existed", async () => {
    const orderMock = new OrderBuilder()
      .withParam("orderNumber", "3")
      .withParam("id", "3")
      .build();
    const messageExpected = "Data was deleted";
    jest.spyOn(keys, "createGuid").mockReturnValue("1003");
    await supertest(`http://localhost:${config.PORT}`)
      .post("/orders")
      .send(orderMock);

    const response = await supertest(`http://localhost:${config.PORT}`)
      .delete("/orders/1003");
    const responseGet = await supertest(`http://localhost:${config.PORT}`)
      .get("/orders/3");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.message).toBe(messageExpected);
    expect(responseGet.status).toBe(httpStatus.NOT_FOUND);
    ;
  });
});
