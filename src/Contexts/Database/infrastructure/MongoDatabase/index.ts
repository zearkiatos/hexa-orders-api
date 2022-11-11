import mongoose from "mongoose";
import Database from "@Database/infrastructure/Database";
import config from "@Config/index";
import DatabaseErrorHandler from "@Api/Errors/DatabaseErrorHandler";
import { Logger } from "@Api/utils/logger";
const log = Logger(__filename);

class MongoDatabase implements Database {
  public async connection() {
    try {
      await mongoose.connect(config.MONGO_DATABASE_URI, {
        useNewUrlParser: true,
      });
      log.info("Connection to the database 🍃 🟢");
    } catch (ex: any) {
      log.error("Error in the connection", {
        errorMessage: ex.message,
        stack: ex.stack
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  public async close() {
    try {
      await mongoose.disconnect();
      log.info("Close the database success 🔒");
    } catch (ex: any) {
      log.error("Error when try to disconnect the database", {
        errorMessage: ex.message,
        stack: ex.stack
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  getDatabaseContext() {
    throw new Error("Method not implemented.");
  }
}

export default MongoDatabase;
