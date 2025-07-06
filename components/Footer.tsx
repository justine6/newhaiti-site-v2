'use client';

type FooterProps = {
  dictionary: {
    copyright: string;
    poweredBy?: string;
  };
};

export default function Footer({ dictionary }: FooterProps) {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center text-sm">
      <p className="mb-2">
        {dictionary?.copyright || '© 2025 New Haiti Team 2075. All rights reserved.'}
      </p>
      {dictionary?.poweredBy && (
        <p className="text-gray-400">{dictionary.poweredBy}</p>
      )}
    </footer>
  );
}
