import { Router, type IRouter } from "express";
import healthRouter from "./health";
import eventosFallasRouter from "./eventos-fallas";

const router: IRouter = Router();

router.use(healthRouter);
router.use(eventosFallasRouter);

export default router;