import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const users = {
  "user1": "vless://UUID1@IP:443?security=reality&sni=example.com#User1",
  "user2": "vless://UUID2@IP:443?security=reality&sni=example.com#User2"
};

app.get("/config", (req, res) => {
  const user = req.query.user;
  if (!user || !users[user]) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({ config: users[user] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));