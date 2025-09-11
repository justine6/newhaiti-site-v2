// app/[locale]/layout.tsx
import '../../styles/globals.css';
import { ReactNode } from 'react';
import Topbar from '@/components/navigation/Topbar';
import { languages, type Locale } from '@/lib/i18n/settings';
import { getDictionary } from '@/lib/i18n/get-dictionary';

export async function generateStaticParams() {
  return languages.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: 'Team Haiti 2075',
    description: 'Restoring Dignity. Rebuilding Hope.',
  };
}

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout(props: Props) {
  // ✅ Next 15 dynamic API rule
  const { locale } = await Promise.resolve(props.params);

  const safeLocale: Locale = (languages as readonly string[]).includes(locale)
    ? (locale as Locale)
    : 'en';

  // Load localized topbar labels from the home dictionary
  const homeDict = await getDictionary(safeLocale, 'home') as any;
  const topbarLabels =
    homeDict?.topbar ?? {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
      vision: 'Vision',
      language: 'Language',
    };

  return (
    <>
      <Topbar locale={safeLocale} labels={topbarLabels} />
      {props.children}
    </>
  );
}


