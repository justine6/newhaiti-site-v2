import "@/styles/globals.css";
import TranslationWarning from "@/lib/hooks/TranslationWarning";

export const metadata = {
  title: "Team Haiti 2075",
  description: "Restoring Dignity. Rebuilding Hope.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <TranslationWarning />  {/* ✅ No TSX errors now */}
        {children}
      </body>
    </html>
  );
}
