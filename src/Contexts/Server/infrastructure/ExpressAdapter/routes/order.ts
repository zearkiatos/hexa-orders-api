import { Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import Service from "@Api/Contexts/Shared/application/Service";
import { Logger } from "@Utils/logger";
import { Injection, Inject } from "@Utils/dependencyInjection";
import Config from "@Config/env/config";
import Order from "@Api/Contexts/Order/application/order";
import OrderModel from "@Api/Contexts/Order/domain/Order";
import GetOrders from "@Api/Contexts/Order/application/order/GetOrders";
import PostOrder from "@Api/Contexts/Order/application/order/PostOrder";

const log = Logger(__filename);



@Injection()
class Route {
  private service: Service;

  constructor(@Inject("Order") service?: Service) {
    this.service = service;
  }

  get() {
    return async (_request: Request, response: Response) => {
      try {
        const service:any[] = await this.service.run();

        const orders:any[] = await (service[0] as GetOrders).run();

        const data = orders;

        response.status(httpStatusCode.OK).send(data);
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

  async post(request:Request, response: Response) {
    try {
        const service:any[] = await this.service.run();

        const order:OrderModel = (request.body as OrderModel);

        await (service[1] as PostOrder).run(order);

        const data = {
            message: "Save successfully"
        };

        response.status(httpStatusCode.OK).send(data);
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
  }
}

export default Route;
