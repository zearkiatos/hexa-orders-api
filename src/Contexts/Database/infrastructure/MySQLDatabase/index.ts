import Database from "@Database/infrastructure/Database";
class MySQLDatabase implements Database {
  connection(): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  close(): Promise<boolean | void> {
    throw new Error("Method not implemented.");
  }
  getDatabaseContext() {
    throw new Error("Method not implemented.");
  }
}

export default MySQLDatabase;
 