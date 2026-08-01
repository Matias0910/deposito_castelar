import { Router } from "express";
import healthRouter from "./health.js";
import eventosFallasRouter from "./eventos-fallas.js";

const router = Router();

router.use(healthRouter);
router.use(eventosFallasRouter);

export default router;