import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://myvpn-production.up.railway.app"; // ✅ Railway backend

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Ошибка регистрации");

      alert("✅ Регистрация успешна! Теперь войдите.");
      navigate("/");
    } catch {
      setError("Ошибка сети");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Регистрация</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Пароль"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Зарегистрироваться
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          Уже есть аккаунт?{" "}
          <button className="text-blue-600" onClick={() => navigate("/")}>
            Войти
          </button>
        </p>
      </div>
    </div>
  );
}