// app/[locale]/donate/cancel/page.tsx
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";
import DonationResultCard from "@/components/DonationResultCard";

type DonateCancelPageProps = {
  params: Promise<{ locale: Locale }>;
};

type DonateCancelDictionary = {
  title: string;
  message: string;
  note: string;
  backHome: string;
  tryAgain: string;
};

export default async function DonateCancelPage({
  params,
}: DonateCancelPageProps) {
  const { locale } = await params;

  const dict = (await getDictionary(
    locale,
    "donate-cancel",
  )) as DonateCancelDictionary;

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <DonationResultCard
        variant="cancel"
        title={dict.title}
        message={dict.message}
        note={dict.note}
        secondaryLabel={dict.backHome}
        secondaryHref={`/${locale}`}
        primaryLabel={dict.tryAgain}
        primaryHref={`/${locale}#donate`}
      />
    </main>
  );
}
