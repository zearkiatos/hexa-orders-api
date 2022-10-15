import Express, { Response, Request, NextFunction } from "express";
import { v4 } from "uuid";
import { TrackingData } from "./trackingData";

const trackingGenerator = (api: Express.Express) => {
  api.use(async (request: Request, response: Response, next: NextFunction) => {
    const flowId = request.headers["x-flowid"]
      ? request.headers["x-flowid"]
      : v4();
    TrackingData.FlowId = flowId;

    const requestId = v4();
    TrackingData.RequestId = requestId;

    await next();

    response.set("X-FlowId", flowId);
    response.set("X-RequestId", requestId);
  });
};

export { trackingGenerator };
