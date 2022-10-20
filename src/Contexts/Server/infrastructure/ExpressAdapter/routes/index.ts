import Express from "express";
import bodyParser from "body-parser";
import HealthRouter from "@Api/Contexts/Server/infrastructure/ExpressAdapter/routes/health";
import NotFoundRouter from "@Api/Contexts/Server/infrastructure/ExpressAdapter/routes/notFound";
import OrderRouter from "@Api/Contexts/Server/infrastructure/ExpressAdapter/routes/order";
const router = Express.Router();

const jsonParser = bodyParser.json();

const healthRouter = new HealthRouter();
const notFoundRouter = new NotFoundRouter();
const orderRouter = new OrderRouter();
router.get("/health", healthRouter.action());
router.get("/orders", orderRouter.get());
router.post("/orders", jsonParser, (request, response) =>
  orderRouter.post(request, response)
);
router.get("*", notFoundRouter.action());

export default router;
