import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { Card, CardContent, CardHeader } from "../components/Card";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = "https://myvpn-production-645a.up.railway.app"; // ✅ Railway backend

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Ошибка входа");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch {
      setError("Ошибка сети");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
            <span className="text-xl font-black">VPN</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold text-gray-900">Вход в MyVPN</h1>
          <p className="mt-1 text-sm text-gray-600">Продолжите, чтобы управлять своим VPN</p>
        </div>

        <Card className="backdrop-blur">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Авторизация</h2>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                id="password"
                label="Пароль"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" loading={loading} className="w-full">
                Войти
              </Button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
              Нет аккаунта? <Link to="/register" className="text-blue-600 hover:underline">Зарегистрироваться</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}