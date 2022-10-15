import Express from "express";
import { Logger } from "@Utils/logger";

const log = Logger(__filename);

const timingStatus = (api: Express.Express) => {
  api.use(async (ctx: any, next: any) => {
    const start = Date.now();

    log.info("X-Request-Start", {
      method: ctx.method,
      url: ctx.url,
      date: start,
    });

    await next();

    const ms = Date.now() - start;
    const requestEnd = {
      method: ctx.method,
      url: ctx.url,
      executionTime: ms,
      httpStatus: ctx.response.res.statusCode,
    };
    log.info("X-Request-End", requestEnd);

    ctx.set("X-Response-Time", `${ms}ms`);
  });
};

export { timingStatus };
