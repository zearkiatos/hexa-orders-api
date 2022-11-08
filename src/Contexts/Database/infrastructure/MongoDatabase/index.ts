import mongoose from "mongoose";
import Database from "@Database/infrastructure/Database";
import config from "@Config/index";
import DatabaseErrorHandler from "@Api/Errors/DatabaseErrorHandler";
import { Logger } from "@Api/utils/logger";
const log = Logger(__filename);

class MongoDatabase implements Database {
  connection(): Promise<boolean> {
    try {
      mongoose.connect(config.MONGO_DATABASE_URI);
      log.info("Connection to the database 🍃 🟢");
      return Promise.resolve(true);
    } catch (ex: any) {
      log.error("Error in the connection", {
        errorMessage: ex.message,
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  close(): Promise<boolean> {
    try {
      mongoose.disconnect();
      log.info("Close the database success 🔒");
      return Promise.resolve(true);
    } catch (ex: any) {
      log.error("Error when try to disconnect the database", {
        errorMessage: ex.message,
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  getDatabaseContext() {
    throw new Error("Method not implemented.");
  }
}

export default MongoDatabase;
