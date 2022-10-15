import Infrastructure from "@Api/Contexts/Shared/infrastructure/infrastructure";
import { Injection, Inject } from "@Utils/dependencyInjection";

@Injection()
export default class Api {
  private server: Infrastructure;

  constructor(@Inject("WebServer") server?: Infrastructure) {
    this.server = server;
  }

  async start() {
    await this.server.start();
  }

  async stop() {
    await this.server.stop();
  }
}
