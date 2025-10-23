import { Router } from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import { getAll, getById, create, update, remove, setPassword } from "../controllers/usuarios.controller.js";
import { createUsuarioValidator, updateUsuarioValidator, setPasswordValidator } from "../validators/usuarios.validator.js";

const router = Router();

router.get("/getAll", asyncHandler(getAll));
router.get("/getById/:id", asyncHandler(getById));
router.post("/create", createUsuarioValidator, asyncHandler(create));
router.put("/update/:id", updateUsuarioValidator, asyncHandler(update));
router.delete("/remove/:id", asyncHandler(remove));
router.post("/setPassword/:id", setPasswordValidator, asyncHandler(setPassword));

export default router;
