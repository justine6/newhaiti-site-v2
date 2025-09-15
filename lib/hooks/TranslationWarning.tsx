"use client";
import React from "react";

export default function TranslationWarning() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      style={{
        backgroundColor: "rgba(255,0,0,0.1)",
        color: "red",
        padding: "8px 16px",
        fontSize: "14px",
        borderBottom: "1px solid red",
        textAlign: "center",
        fontFamily: "monospace",
      }}
    >
      🌸 Translation check active → verify JSON dictionaries <br />
      Check <code>lib/i18n/dictionaries/en/home.json</code> and ensure all required sections exist.
    </div>
  );
}
