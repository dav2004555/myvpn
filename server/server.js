import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import User from "./models/User.js"; // ✅ добавляем модель

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://myvpn-production-645a.up.railway.app",
  "https://myvpn-production.up.railway.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use("/", authRoutes);

console.log("Connecting to MongoDB with URL:", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("✅ MongoDB Connected");
    await User.syncIndexes(); // ✅ пересоздаёт индексы
    console.log("✅ Indexes synced");
  })
  .catch((err) => console.error(err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));