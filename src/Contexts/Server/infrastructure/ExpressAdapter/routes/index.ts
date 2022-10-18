import Express from "express";
import HealthRouter from "@Api/Contexts/Server/infrastructure/ExpressAdapter/routes/health";
import NotFoundRouter from "@Api/Contexts/Server/infrastructure/ExpressAdapter/routes/notFound";
const router = Express.Router();

const healthRouter = new HealthRouter();
const notFoundRouter = new NotFoundRouter();
router.get("/health", healthRouter.action());
router.get("*", notFoundRouter.action());

export default router;
