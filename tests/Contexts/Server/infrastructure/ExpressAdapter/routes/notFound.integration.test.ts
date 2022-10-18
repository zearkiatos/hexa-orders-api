import supertest from "supertest";
import httpStatus from "http-status-codes";
import Api from "@Api/Api";
import config from "@Config/env/config";
import NotFoundBuilder from "@Builders/notFoundBuilder";

const api = new Api();

describe("Test suite for express adapter", () => {
  beforeAll(async () => {
    await api.start();
  });

  afterAll(async () => {
    await api.stop();
  });
  test("Should get status 200 when call health", async () => {
    const notFoundMock = new NotFoundBuilder().build();
    const response = await supertest(`http://localhost:${config.PORT}`).get(
      "/fake-path"
    );

    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toEqual(notFoundMock);
  });
});
