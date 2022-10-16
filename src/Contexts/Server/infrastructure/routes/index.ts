import Express from "express";
import HealthRouter from "@Api/Contexts/Server/infrastructure/routes/health";
const router = Express.Router();

const healthRouter = new HealthRouter();
router.get("/health",  healthRouter.action());

export default router;
