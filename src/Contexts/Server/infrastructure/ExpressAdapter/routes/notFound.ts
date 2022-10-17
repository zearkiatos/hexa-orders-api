import { Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import Service from "@Api/Contexts/Shared/application/Service";
import { Logger } from "@Utils/logger";
import { Injection, Inject } from "@Utils/dependencyInjection";

const log = Logger(__filename);

@Injection()
class Route {
  private service: Service;

  constructor(@Inject("NotFound") service?: Service) {
    this.service = service;
  }

  action() {
    return async (_request: Request, response: Response) => {
      try {
        const data = await this.service.run();

        const status = httpStatusCode.NOT_FOUND;

        response.status(status).send(data);
      } catch (error: any) {
        log.error("Error in Health Route", {
          errorMessage: error.message,
          stack: error.stack,
        });
        const status = httpStatusCode.INTERNAL_SERVER_ERROR;
        const data = {
          message: "Error",
        };
        response.status(status).send(data);
      }
    };
  }
}

export default Route;
