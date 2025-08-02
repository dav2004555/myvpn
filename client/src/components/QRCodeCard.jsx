import { QRCodeCanvas } from "qrcode.react";

export default function QRCodeCard({ config }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md text-center">
      <QRCodeCanvas value={config} size={180} />
      <p className="mt-3 break-all text-sm">{config}</p>
      <a
        href={config}
        className="mt-4 block bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
      >
        Подключиться
      </a>
    </div>
  );
}