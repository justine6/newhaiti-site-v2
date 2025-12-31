import Link from "next/link";

type DonateCancelPageProps = {
  // In Next 15, params is a Promise
  params: Promise<{ locale: string }>;
};

export default async function DonateCancelPage({
  params,
}: DonateCancelPageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg px-6 py-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-2xl">
          !
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          Donation cancelled
        </h1>

        {/* Main message */}
        <p className="text-slate-600 text-sm sm:text-base mb-4">
          Your donation was cancelled before it was completed. No funds were
          charged. You can return to the homepage or try again at any time.
        </p>

        {/* Help note */}
        <p className="text-xs sm:text-sm text-slate-400 mb-8">
          If you believe this was a mistake, please try again or contact the
          Nouvo Ayiti 2075 team for assistance.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-800 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition"
          >
            Back to homepage
          </Link>

          <Link
            href={`/${locale}#donate`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            Try donating again
          </Link>
        </div>
      </section>
    </main>
  );
}
