import { Router } from "express";

const router = Router();

router.get("/health", (req: any, res: any) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;