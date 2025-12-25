// app/layout.tsx
import "@/styles/globals.css";
import type { ReactNode } from "react";
import TranslationWarning from "@/lib/hooks/TranslationWarning";

export const metadata = {
  title: "Team Haiti 2075",
  description: "Restoring Dignity. Rebuilding Hope.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" dir="ltr">
      <body>
        {isDev && <TranslationWarning />}
        {children}
      </body>
    </html>
  );
}
