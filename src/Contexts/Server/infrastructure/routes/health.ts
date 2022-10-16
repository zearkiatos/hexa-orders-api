import { Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import Service from "@Api/Contexts/Shared/application/Service";
import { Logger } from "@Utils/logger";
import { Injection, Inject } from "@Utils/dependencyInjection";

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
        _request.body = statusDTO
          ? httpStatusCode.OK
          : httpStatusCode.INTERNAL_SERVER_ERROR;
        response.json(_request.body);
      } catch (error: any) {
        log.error("Error in Health Route", {
          errorMessage: error.message,
          stack: error.stack,
        });
        _request.body = httpStatusCode.INTERNAL_SERVER_ERROR;
        response.json(_request.body);
      }
    };
  }
}

export default Route;
