import { QRCodeCanvas } from "qrcode.react";
import Button from "./Button";

export default function QRCodeCard({ config, onCopy, onDownload, onOpen }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm text-center">
      <div className="flex justify-center">
        <div className="rounded-xl border border-gray-200 p-4">
          <QRCodeCanvas value={config} size={200} />
        </div>
      </div>
      <p className="mt-3 break-all text-xs text-gray-800 bg-gray-50 rounded-lg p-3">{config}</p>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onCopy}>Копировать</Button>
          <Button variant="secondary" onClick={onDownload}>Скачать</Button>
        </div>
        <Button onClick={onOpen}>Подключиться</Button>
      </div>
    </div>
  );
}