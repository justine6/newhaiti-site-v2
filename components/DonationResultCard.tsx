// components/DonationResultCard.tsx
import Link from "next/link";

type DonationResultVariant = "success" | "cancel";

type DonationResultCardDictionary = {
  title?: string;
  message?: string;
  note?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
};

type DonationResultCardProps = {
  variant: DonationResultVariant;
  locale: string;
  dictionary?: DonationResultCardDictionary;
};

export default function DonationResultCard({
  variant,
  locale,
  dictionary,
}: DonationResultCardProps) {
  const isSuccess = variant === "success";

  const iconSymbol = isSuccess ? "✓" : "!";
  const iconClasses = isSuccess
    ? "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-2xl"
    : "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-2xl";

  const title =
    dictionary?.title ??
    (isSuccess ? "Thank you for your donation!" : "Donation cancelled");

  const message =
    dictionary?.message ??
    (isSuccess
      ? "Your contribution helps Nouvo Ayiti 2075 support long-term, people-first projects to restore communities, infrastructure, and opportunity in Haiti."
      : "Your donation was cancelled before it was completed. No funds were charged. You can return to the homepage or try again at any time.");

  const note =
    dictionary?.note ??
    (isSuccess
      ? "A payment confirmation and receipt have been sent to your email by our secure payment provider."
      : "If you believe this was a mistake, please try again or contact the Nouvo Ayiti 2075 team for assistance.");

  const primaryCtaLabel =
    dictionary?.primaryCtaLabel ?? "Back to homepage";

  const secondaryCtaLabel =
    dictionary?.secondaryCtaLabel ??
    (isSuccess ? "See how funds are used" : "Try donating again");

  const secondaryHref = isSuccess
    ? `/${locale}/projects`
    : `/${locale}#donate`;

  return (
    <section className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg px-6 py-10 text-center">
      <div className={iconClasses}>{iconSymbol}</div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h1>

      <p className="text-slate-600 text-sm sm:text-base mb-4">
        {message}
      </p>

      <p className="text-xs sm:text-sm text-slate-400 mb-8">{note}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center justify-center rounded-full border border-slate-800 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition"
        >
          {primaryCtaLabel}
        </Link>

        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
        >
          {secondaryCtaLabel}
        </Link>
      </div>
    </section>
  );
}
