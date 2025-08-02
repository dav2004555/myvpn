import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://myvpn-production-645a.up.railway.app"; // ✅ Railway backend

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Ошибка входа");

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Ошибка сети");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Вход</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
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
          <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Войти
          </button>
        </form>
        <p className="text-sm mt-3 text-center">
          Нет аккаунта?{" "}
          <button
            className="text-blue-600"
            onClick={() => navigate("/register")}
          >
            Зарегистрироваться
          </button>
        </p>
      </div>
    </div>
  );
}