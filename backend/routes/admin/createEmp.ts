import { Router } from "express";
import { authenticateJwt } from "../auth";
import { requireHrOrAdmin } from "../../utils/requireHrOrAdmin";

const router = Router();

router.get("/genereateEmployeeCredentials", authenticateJwt, requireHrOrAdmin, (_req, res) => {
  res.send("accessed");
});

export default router;
