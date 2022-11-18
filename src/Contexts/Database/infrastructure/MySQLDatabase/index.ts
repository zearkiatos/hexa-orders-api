import { createPool, Pool } from "mysql2/promise";
import config from "@Config/index";
import Database from "@Database/infrastructure/Database";
import DatabaseErrorHandler from "@Api/Errors/DatabaseErrorHandler";
import { Logger } from "@Api/utils/logger";
const log = Logger(__filename);

class MySQLDatabase implements Database {
  private connectionPool: Pool;
  public async connection(): Promise<void> {
    try {
      this.connectionPool = createPool({
        host: config.MY_SQL_DTABASE.HOST,
        user: config.MY_SQL_DTABASE.USER,
        password: config.MY_SQL_DTABASE.PASSWORD,
        database: config.MY_SQL_DTABASE.DATABASE,
        port: config.MY_SQL_DTABASE.PORT,
        decimalNumbers: true,
      });
      log.info("Create connection pool 🐬 🟢");
    } catch (ex: any) {
      log.error("Error in the connection pool", {
        errorMessage: ex.message,
        stack: ex.stack,
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  public async close(): Promise<void> {
    try {
      await this.connectionPool.end();
      log.info("Close the database success 🔒");
    } catch (ex: any) {
      log.error("Error when try to disconnect the database", {
        errorMessage: ex.message,
        stack: ex.stack,
      });
      throw new DatabaseErrorHandler(ex.message);
    }
  }
  public getDatabaseContext(): Pool {
    return this.connectionPool;
  }
}

export default MySQLDatabase;
