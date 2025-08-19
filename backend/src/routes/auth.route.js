import express from "express";
import { login, signup, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// How POST Works
// When you submit a form on a website (e.g., creating a new user account, writing a blog post, or sending a message), 

router.post("/signup", signup);

router.post("/login",  login);

router.post("/logout", logout);

export default router;
