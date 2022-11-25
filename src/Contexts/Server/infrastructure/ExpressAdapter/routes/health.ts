import { Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import Service from "@Api/Contexts/Shared/application/Service";
import { Logger } from "@Utils/logger";
import { Injection, Inject } from "@Utils/dependencyInjection";
import Config from "@Config/env/config";

const log = Logger(__filename);

@Injection()
class Route {
  private service: Service;

  constructor(@Inject("Health") service?: Service) {
    this.service = service;
  }

  action() {
    return async (_request: Request, response: Response) => {
      try {
        const statusDTO = await this.service.run();

        const status = statusDTO
          ? httpStatusCode.OK
          : httpStatusCode.INTERNAL_SERVER_ERROR;

        const data = {
          uptime: process.uptime(),
          message: "Ok",
          date: new Date(),
          environment: Config.ENVIRONMENT,
        };

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
