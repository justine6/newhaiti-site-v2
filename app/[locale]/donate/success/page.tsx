// app/[locale]/donate/success/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import DonationResultCard from "@/components/DonationResultCard";

type DonateSuccessPageProps = {
  // Next 15: params is a Promise
  params: Promise<{ locale: Locale }>;
};

type DonateSuccessDictionary = {
  title: string;
  message: string;
  note: string;
  backHome: string;
  seeProjects: string;
};

export default async function DonateSuccessPage({
  params,
}: DonateSuccessPageProps) {
  const { locale } = await params;

  const dict = (await getDictionary(
    locale,
    "donate-success",
  )) as DonateSuccessDictionary;

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <DonationResultCard
        variant="success"
        title={dict.title}
        message={dict.message}
        note={dict.note}
        secondaryLabel={dict.backHome}
        secondaryHref={`/${locale}`}
        primaryLabel={dict.seeProjects}
        primaryHref={`/${locale}/projects`}
      />
    </main>
  );
}
