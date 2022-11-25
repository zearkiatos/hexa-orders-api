import Infrastructure from "@Api/Contexts/Shared/infrastructure/infrastructure";
import { Injection, Inject } from "@Utils/dependencyInjection";
import Database from "@Database/infrastructure/Database";

@Injection()
export default class Api {
  private server: Infrastructure;
  private database: Database;

  constructor(
    @Inject("WebServer") server?: Infrastructure,
    @Inject("Database") database?: Database
  ) {
    this.server = server;
    this.database = database;
  }

  async start() {
    await this.server.start();
    await this.database.connection();
  }

  async stop() {
    await this.server.stop();
    await this.database.close();
  }
}
