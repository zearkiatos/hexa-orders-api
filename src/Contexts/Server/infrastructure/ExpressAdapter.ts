import { Server } from "http";
import Express from "express";
import { Logger } from "@Utils/logger";
import Infrastructure from "@Shared/infrastructure/infrastructure";

const log = Logger(__filename);

class ExpressAdapter implements Infrastructure {
  private express: Express.Express;
  private port: number;
  private http?: Server;

  constructor(port: number) {
    this.port = port;
    this.express = Express();
  }

  start(): void | Promise<void> {
    this.http = this.express.listen(this.port, () => {
      log.info(`Server started 🚀 on port: ${this.port} 🟢 `);
    });
  }
  stop(): void | Promise<void> {
    if (this.http) {
      this.http.close((error) => {
        if (error) {
          log.error(`Something wrong to close web Server: ${error}`);
        }
        log.info(`Server was stoped on port:${this.port}`);
      });
    } else {
      log.info(`Server not found, is already stoped`);
    }
  }
}

export default ExpressAdapter;
