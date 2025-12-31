// app/[locale]/donate/cancel/page.tsx
import DonationResultCard from "@/components/DonationResultCard";
import { getDictionary } from "@/lib/i18n/get-dictionary";

type DonateCancelPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DonateCancelPage({
  params,
}: DonateCancelPageProps) {
  const { locale } = await params;

  const dictionary = await getDictionary(locale, "donate-cancel");

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <DonationResultCard
        variant="cancel"
        locale={locale}
        dictionary={dictionary}
      />
    </main>
  );
}
