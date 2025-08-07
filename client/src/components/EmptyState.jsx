import React from "react";

export default function EmptyState({
  title = "Нет данных",
  description = "",
  icon = null,
  className = "",
}) {
  return (
    <div className={`flex flex-col items-center text-center gap-2 ${className}`}>
      {icon}
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {description && (
        <p className="text-xs text-gray-500 max-w-sm">{description}</p>
      )}
    </div>
  );
}