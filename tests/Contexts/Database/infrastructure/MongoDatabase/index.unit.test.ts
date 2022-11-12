import mongoose from "mongoose";
import MongoDatabase from "@Api/Contexts/Database/infrastructure/MongoDatabase";
import DatabaseErrorHandler from "@Api/Errors/DatabaseErrorHandler";

describe("Test suite for MongoDatabase infrastructure dependency", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test("Should generate a error throw when something failed in the database connection", async () => {
    const moongoseConnectionSpyOn = jest
      .spyOn(mongoose, "connect")
      .mockImplementation(() => {
        throw new Error("Something was wrong 🤯");
      });

      try {
        const mongoDatabase = new MongoDatabase();
        await mongoDatabase.connection();
      }
      catch(ex:any) {
        expect(moongoseConnectionSpyOn).toHaveBeenCalled();
        expect(ex.message).toBe("Something was wrong 🤯");
        expect(ex instanceof DatabaseErrorHandler).toBeTruthy();
      }
  });

  test("Should generate a error throw when something failed in the database close", async () => {
    const moongoseConnectionSpyOn = jest
      .spyOn(mongoose, "disconnect")
      .mockImplementation(() => {
        throw new Error("Something was wrong 🤯");
      });

      try {
        const mongoDatabase = new MongoDatabase();
        await mongoDatabase.close();
      }
      catch(ex:any) {
        expect(moongoseConnectionSpyOn).toHaveBeenCalled();
        expect(ex.message).toBe("Something was wrong 🤯");
        expect(ex instanceof DatabaseErrorHandler).toBeTruthy();
      }
  });

  test("Should get a Not implementation error", async () => {
      try {
        const mongoDatabase = new MongoDatabase();
        await mongoDatabase.getDatabaseContext();
      }
      catch(ex:any) {
        expect(ex.message).toBe("Method not implemented.");
        expect(ex instanceof Error).toBeTruthy();
      }
  });
});
