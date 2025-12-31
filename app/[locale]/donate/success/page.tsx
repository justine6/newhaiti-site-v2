import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type DonateSuccessPageProps = {
  // Next 15: params is a Promise
  params: Promise<{ locale: Locale }>;
};

export default async function DonateSuccessPage({
  params,
}: DonateSuccessPageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale, "donate");
  const success = (dict as any)?.success ?? {};

  const title =
    success.title ?? "Thank you for your donation!";
  const message =
    success.message ??
    "Your contribution helps Nouvo Ayiti 2075 support long-term, people-first projects to restore communities, infrastructure, and opportunity in Haiti.";
  const receipt =
    success.receipt ??
    "A payment confirmation and receipt have been sent to your email by our secure payment provider.";
  const backHomeLabel =
    success.backHome ?? "Back to homepage";
  const seeFundsLabel =
    success.seeFunds ?? "See how funds are used";

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg px-6 py-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl">
          ✓
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {title}
        </h1>

        {/* Main message */}
        <p className="text-slate-600 text-sm sm:text-base mb-4">
          {message}
        </p>

        {/* Receipt note */}
        <p className="text-xs sm:text-sm text-slate-400 mb-8">
          {receipt}
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-800 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition"
          >
            {backHomeLabel}
          </Link>

          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            {seeFundsLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
