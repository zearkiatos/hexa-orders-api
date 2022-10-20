import Database from "@Database/infrastructure/Database";

class MockDatabase implements Database {
  private context;

  constructor() {
    this.context = {
      name: "MockDatabase",
    };
  }

  getDatabaseContext() {
    return this.context;
  }
  connection(): Promise<boolean> {
    return Promise.resolve(true);
  }
  close(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export default MockDatabase;
