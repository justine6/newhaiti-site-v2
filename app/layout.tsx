// app/layout.tsx
import '@/styles/globals.css';

export const metadata = {
  title: 'Haiti 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}

