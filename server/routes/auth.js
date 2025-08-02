import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";

const router = express.Router();

// 📌 Регистрация
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Введите email и пароль" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: "Пользователь уже существует" });

  const hashed = await bcrypt.hash(password, 10);
  const uuid = uuidv4();

  const user = await User.create({ email, password: hashed, uuid });

  res.json({ message: "Регистрация успешна" });
});

// 📌 Логин
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: "Неверные данные" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: "Неверные данные" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.json({ token });
});

// 📌 Получить конфиг
router.get("/config", async (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "Нет токена" });

  try {
    const decoded = jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    const config = `vless://${user.uuid}@64.176.203.195:443?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=f4ctwiEjeK7rFdvQx74J_zrTyPxIwtvGVl6BrdceFRE&type=tcp#MyVPN`;
    res.json({ config });
  } catch {
    res.status(401).json({ error: "Неверный токен" });
  }
});

export default router;