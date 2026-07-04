"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth");
const db_1 = require("../../utils/db");
const router = (0, express_1.Router)();
router.get("/", auth_1.authenticateJwt, async (req, res) => {
    try {
        if (typeof req.user === "string" || !req.user?.companyName) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const result = await db_1.pool.query("SELECT name, employee_id, status FROM users WHERE company_name = $1", [req.user.companyName]);
        res.json({
            employees: result.rows.map((row) => ({
                name: row.name,
                employee_id: row.employee_id,
                status: row.status,
            })),
        });
    }
    catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.patch("/status", auth_1.authenticateJwt, async (req, res) => {
    try {
        if (typeof req.user === "string" || !req.user?.userId) {
            return res.status(401).json({ message: "Invalid token" });
        }
        const { status } = req.body;
        const VALID_STATUSES = ["present", "absent", "halfday", "leave"];
        if (!status || !VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
            });
        }
        await db_1.pool.query("UPDATE users SET status = $1, updated_at = NOW() WHERE id = $2", [
            status,
            req.user.userId,
        ]);
        res.json({ message: "Status updated", status });
    }
    catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = router;
