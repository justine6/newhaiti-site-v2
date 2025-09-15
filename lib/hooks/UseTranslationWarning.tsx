// lib/hooks/UseTranslationWarning.tsx
"use client";

export default function UseTranslationWarning() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div style={{ color: "red", padding: "10px" }}>
      ⚠️ Translation issues detected! Please check your dictionaries.
    </div>
  );
}
