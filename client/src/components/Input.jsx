import React from "react";

export default function Input({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  helper,
  className = "",
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-800">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 ${
          error ? "border-red-500 focus:ring-red-100" : "border-gray-300"
        }`}
        {...props}
      />
      {helper && !error && (
        <p className="text-xs text-gray-500">{helper}</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}