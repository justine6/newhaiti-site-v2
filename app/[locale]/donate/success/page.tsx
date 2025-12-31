// app/[locale]/donate/success/page.tsx
import DonationResultCard from "@/components/DonationResultCard";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type DonateSuccessPageProps = {
  // Next 15: params is a Promise
  params: Promise<{ locale: string }>;
};

export default async function DonateSuccessPage({
  params,
}: DonateSuccessPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale, "donate-success");

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <DonationResultCard
        variant="success"
        locale={locale}
        dictionary={dictionary}
      />
    </main>
  );
}
