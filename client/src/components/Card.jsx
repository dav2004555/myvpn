import React from "react";

export function Card({ className = "", children }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ className = "", children }) {
  return (
    <div className={`p-5 border-b border-gray-200 ${className}`}>{children}</div>
  );
}

export function CardContent({ className = "", children }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

export function CardFooter({ className = "", children }) {
  return (
    <div className={`p-5 border-t border-gray-200 flex items-center justify-end gap-3 ${className}`}>
      {children}
    </div>
  );
}