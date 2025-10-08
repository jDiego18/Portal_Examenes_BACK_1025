import { Router } from "express";
import { root } from "../controllers/root.controller.js";

const router = Router();

router.get("/root", root);

export default router;
