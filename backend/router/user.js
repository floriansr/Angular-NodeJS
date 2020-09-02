import express from "express";
import logs from "../controllers/user.js";

const router = express.Router();

router.post("/signup", logs.signup);
router.post("/login", logs.login);

export default router