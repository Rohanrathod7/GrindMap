import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { scrapeLeetCode } from "./services/scraping/leetcode.scraper.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔗 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/api/leetcode/:username", async (req, res) => {
  const data = await scrapeLeetCode(req.params.username);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
