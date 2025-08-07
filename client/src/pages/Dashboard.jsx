import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Button from "../components/Button";
import { Card, CardContent, CardHeader, CardFooter } from "../components/Card";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const [config, setConfig] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const API_URL = "https://myvpn-production-645a.up.railway.app"; // ✅ Railway backend

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetch(`${API_URL}/config`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setConfig(data.config))
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleCopy = async () => {
    if (!config) return;
    await navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!config) return;
    const blob = new Blob([config], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "myvpn-config.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleOpen = () => {
    if (!config) return;
    window.location.href = config;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
              <span className="text-sm font-black">VPN</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Ваш VPN</h1>
              <p className="text-xs text-gray-600">Сканируйте QR или используйте ссылку</p>
            </div>
          </div>
          <Button variant="danger" onClick={logout}>Выйти</Button>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900">Конфигурация</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <EmptyState title="Загрузка..." description="Получаем ваш конфиг" />
            ) : config ? (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-xl border border-gray-200 p-4">
                  <QRCodeCanvas value={config} size={220} />
                </div>
                <code className="block w-full max-w-xl break-all rounded-lg bg-gray-50 p-3 text-xs text-gray-800">
                  {config}
                </code>
              </div>
            ) : (
              <EmptyState title="Конфиг недоступен" description="Попробуйте обновить страницу или войти снова" />)
            }
          </CardContent>
          {config && (
            <CardFooter className="justify-between">
              <div className="flex items-center gap-2">
                <Button variant="secondary" onClick={handleCopy}>
                  {copied ? "Скопировано" : "Копировать"}
                </Button>
                <Button variant="secondary" onClick={handleDownload}>Скачать</Button>
              </div>
              <Button onClick={handleOpen}>Подключиться</Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}