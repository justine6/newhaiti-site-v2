// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'New Haiti Team 2075',
  description: 'Restoring Dignity. Rebuilding Hope.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
