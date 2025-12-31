// components/DonationResultCard.tsx
import Link from "next/link";

type DonationResultCardProps = {
  variant: "success" | "cancel";
  title: string;
  message: string;
  note: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function DonationResultCard({
  variant,
  title,
  message,
  note,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: DonationResultCardProps) {
  const isSuccess = variant === "success";

  const iconClasses = isSuccess
    ? "bg-emerald-100 text-emerald-700"
    : "bg-rose-100 text-rose-700";

  const iconSymbol = isSuccess ? "✓" : "!";

  return (
    <section className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg px-6 py-10 text-center">
      {/* Icon */}
      <div
        className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-2xl ${iconClasses}`}
      >
        {iconSymbol}
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h1>

      {/* Main message */}
      <p className="text-slate-600 text-sm sm:text-base mb-4">{message}</p>

      {/* Note */}
      <p className="text-xs sm:text-sm text-slate-400 mb-8">{note}</p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {/* Secondary – outlined */}
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-full border border-slate-800 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition"
        >
          {secondaryLabel}
        </Link>

        {/* Primary – filled */}
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
        >
          {primaryLabel}
        </Link>
      </div>
    </section>
  );
}
