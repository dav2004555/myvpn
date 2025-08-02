import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Статический UUID для всех пользователей
const STATIC_UUID = "2816cde7-aa2f-4811-be62-54caad866811";

// 📌 Регистрация — убираем uuid, создаём пользователя без него
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Введите email и пароль" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Пользователь уже существует" });
    }

    const hashed = await bcrypt.hash(password, 10);

    // Создаем пользователя без uuid
    const user = await User.create({ email, password: hashed });

    return res.json({ message: "Регистрация успешна", userId: user._id });
  } catch (err) {
    console.error("Ошибка при регистрации:", err);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// 📌 Логин — без изменений
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Неверные данные" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Неверные данные" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({ token });
  } catch (err) {
    console.error("Ошибка при логине:", err);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
});

// 📌 Получить конфиг — возвращаем статический UUID всегда
router.get("/config", (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Нет токена" });

    jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);

    const config = `vless://${STATIC_UUID}@64.176.203.195:443?encryption=none&security=reality&sni=www.cloudflare.com&fp=chrome&pbk=f4ctwiEjeK7rFdvQx74J_zrTyPxIwtvGVl6BrdceFRE&type=tcp#MyVPN`;

    return res.json({ config });
  } catch (err) {
    console.error("Ошибка при получении конфига:", err);
    return res.status(401).json({ error: "Неверный токен" });
  }
});

export default router;