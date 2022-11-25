import Express from "express";
import bodyParser from "body-parser";
import compression from 'compression';
import convert from 'express-convert';
import helmet from "helmet";
import config from "@Config/env/config";
import { Logger } from "@Api/utils/logger";

function expressBodyParser(api: Express.Express) {
  api.use(bodyParser());
}

function expressCompress(api: Express.Express) {
  api.use(compression());
}

const middlewares = (api: Express.Express) => {
    expressBodyParser(api);
    if (!config.DEBUG) {
        api.use(convert(Logger));
    }

    api.use(helmet());
    expressCompress(api);
    
};


export default middlewares;
