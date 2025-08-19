import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app = express();

app.use("/api/auth", authRoutes); //Creating authorization route

const PORT = process.env.P;

app.listen(PORT, () => {
  console.log(`Server is on PORT:${PORT}`);
  connectDB();
});
