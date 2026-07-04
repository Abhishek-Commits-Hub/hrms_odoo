import { Router, type Request, type Response } from "express";
import { type JwtPayload } from "jsonwebtoken";
import { authenticateJwt } from "../auth";
import { pool } from "../../utils/db";

const router = Router();

type AuthRequest = Request & {
  user?: JwtPayload | string;
};

router.get("/", authenticateJwt, async (req: AuthRequest, res: Response) => {
  try {
    if (typeof req.user === "string" || !req.user?.companyName) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const result = await pool.query(
      "SELECT id, name, email, phone, employee_id, role, status FROM users WHERE company_name = $1",
      [req.user.companyName],
    );

    res.json({ employees: result.rows });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/status", authenticateJwt, async (req: AuthRequest, res: Response) => {
  try {
    if (typeof req.user === "string" || !req.user?.userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let { status } = req.body as { status?: string };
    const VALID_STATUSES = ["present", "absent", "halfday", "half_day", "leave"];

    if (!status) {
      return res.status(400).json({
        message: `Status is required. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    if (status === "half_day") {
      status = "halfday";
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    await pool.query("UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2", [
      status,
      req.user.userId,
    ]);

    res.json({ message: "Status updated", status });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
