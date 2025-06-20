import NavBar from '@/components/NavBar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <NavBar />
        {children}
      </body>
    </html>
  );
}
