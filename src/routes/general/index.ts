import express from "express";
import General from "../../controllers/generalController";

const router = express.Router();

router.get("/api/v1/ping", General.ping);

export default router;
