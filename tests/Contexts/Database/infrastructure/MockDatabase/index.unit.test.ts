import mongoose from "mongoose";
import MockDatabase from "@Api/Contexts/Database/infrastructure/MockDatabase";

describe("Test suite for MockDatabase infrastructure dependency", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test("Should get a Not implementation error", async () => {
      try {
        const mockDatabase = new MockDatabase();
        await mockDatabase.getDatabaseContext();
      }
      catch(ex:any) {
        expect(ex.message).toBe("Method not implemented.");
        expect(ex instanceof Error).toBeTruthy();
      }
  });
});