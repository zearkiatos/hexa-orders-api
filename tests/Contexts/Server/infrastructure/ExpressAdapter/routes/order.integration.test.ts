import supertest from "supertest";
import httpStatus from "http-status-codes";
import Api from "@Api/Api";
import config from "@Config/env/config";
import OrderBuilder from "@Builders/orderBuilder";
import MockOrderRepository from "@Api/Contexts/Order/infrastructure/Mock/MockOrderRepository";
import OrderRepositoryMocked from "@Mocks/MockOrderRepositoryMock";
import keys from '@Utils/keys';
jest.mock("@Api/Contexts/Order/infrastructure/Mock/MockOrderRepository");

const api = new Api();

describe("Test suite for express adapter for orders", () => {
  beforeAll(async () => {
    await api.start();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await api.stop();
    jest.clearAllMocks();
  });
  test("Should get status 200 and get a order list", async () => {
    const response = await supertest(`http://localhost:${config.PORT}`).get(
      "/orders"
    );

    expect(response.status).toBe(httpStatus.OK);
    expect(MockOrderRepository).toHaveBeenCalled();
  });

  test("Should get status save a new order", async () => {
    const orderMock = new OrderBuilder().build();
    const messageExpected = "Save successfully";
    // jest.spyOn(keys,'createGuid').mockReturnValue("1000");
    const response = await supertest(`http://localhost:${config.PORT}`).post('/orders').send(
        orderMock
    );

    console.log(response);

    expect(response.status).toBe(httpStatus.OK);
    expect(MockOrderRepository).toHaveBeenCalled();
    expect(response.body.message).toBe(messageExpected);
    expect(response.body.id).toBe("1000");
  });

  test("Should get status save and get a item by id", async () => {
    const orderMock = new OrderBuilder().build();
    const messageExpected = "Save successfully";
    jest.spyOn(keys,'createGuid').mockReturnValue("1000");
    await supertest(`http://localhost:${config.PORT}`).post('/orders').send(
        orderMock
    );
    const response = await supertest(`http://localhost:${config.PORT}`).get('/orders/1000');

    console.log(response.body);

    expect(response.status).toBe(httpStatus.OK);
    expect(MockOrderRepository).toHaveBeenCalled();
    expect(response.body.message).toBe(messageExpected);
  });
});
