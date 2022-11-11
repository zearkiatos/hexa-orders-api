import supertest from "supertest";
import httpStatus from "http-status-codes";
import Api from "@Api/Api";
import config from "@Config/env/config";

const api = new Api();

describe("Test suite for express adapter", () => {
  beforeAll(async () => {
    await api.start();
    
  });

  afterAll(async () => {
    await api.stop();
    
  });
  test("Should get status 200 when call health", async () => {
    const response = await supertest(`http://localhost:${config.PORT}`).get(
      "/health"
    );

    expect(response.status).toBe(httpStatus.OK);
    
  });
});
