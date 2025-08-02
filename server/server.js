import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/", authRoutes);


console.log("Connecting to MongoDB with URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📂 Путь к собранному React (server/public)
const publicPath = path.join(__dirname, "public");

// Раздаём React из server/public
app.use(express.static(publicPath));

// Любой маршрут → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));