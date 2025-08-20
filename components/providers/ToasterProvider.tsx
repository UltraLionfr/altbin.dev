"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#11131c",
          color: "#fff",
          border: "1px solid #2a2f3a",
        },
        success: {
          iconTheme: {
            primary: "#22c55e", // green
            secondary: "#11131c",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444", // red
            secondary: "#11131c",
          },
        },
      }}
    />
  );
}