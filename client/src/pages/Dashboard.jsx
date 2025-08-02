import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

export default function Dashboard() {
  const [config, setConfig] = useState("");
  const navigate = useNavigate();
  const API_URL = "https://myvpn-production.up.railway.app"; // ✅ Railway backend

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    fetch(`${API_URL}/config`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setConfig(data.config))
      .catch(() => navigate("/"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Ваш VPN</h2>
        {config ? (
          <>
            <QRCodeCanvas value={config} size={200} />
            <p className="mt-3 break-all text-sm">{config}</p>
          </>
        ) : (
          <p>Загрузка...</p>
        )}
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Выйти
        </button>
      </div>
    </div>
  );
}