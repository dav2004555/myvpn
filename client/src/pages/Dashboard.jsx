import { useEffect, useState } from "react";
import QRCodeCard from "../components/QRCodeCard";

export default function Dashboard() {
  const [config, setConfig] = useState(null);
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3000/config?user=${user}`)
      .then((res) => res.json())
      .then((data) => setConfig(data.config));
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Добро пожаловать, {user}!</h1>
      {config ? <QRCodeCard config={config} /> : <p>Загрузка...</p>}
    </div>
  );
}
