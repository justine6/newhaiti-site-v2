import Image from 'next/image';
import Link from 'next/link';

export default function Topbar() {
  return (
    <div className="w-full flex items-center justify-between p-4 bg-white shadow-md">
      <Link href="/">
        <Image
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          width={50}
          height={50}
        />
      </Link>
      {/* Add language switch or other elements here */}
    </div>
  );
}
