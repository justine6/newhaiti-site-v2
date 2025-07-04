import { ReactNode } from 'react';
import Topbar from '@/components/navigation/Topbar';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Topbar />
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </>
  );
}
