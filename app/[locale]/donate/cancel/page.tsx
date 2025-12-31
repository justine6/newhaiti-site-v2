import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/settings";

type DonateCancelPageProps = {
  // In Next 15, params is a Promise
  params: Promise<{ locale: Locale }>;
};

type HeroButtonsDict = {
  backToHomepage?: string;
  tryDonatingAgain?: string;
};

type DonateCancelDict = {
  title?: string;
  body?: string;
  helpNote?: string;
};

export default async function DonateCancelPage({
  params,
}: DonateCancelPageProps) {
  const { locale } = await params;

  // 🌍 Load dictionaries
  const homeDict = (await getDictionary(locale, "home")) as {
    hero?: HeroButtonsDict;
  };

  const cancelDict = (await getDictionary(locale, "donate-cancel")) as
    | DonateCancelDict
    | undefined;

  // 🧠 Text from donate-cancel (with English fallbacks)
  const title = cancelDict?.title ?? "Donation cancelled";
  const body =
    cancelDict?.body ??
    "Your donation was cancelled before it was completed. No funds were charged. You can return to the homepage or try again at any time.";
  const helpNote =
    cancelDict?.helpNote ??
    "If you believe this was a mistake, please try again or contact the Nouvo Ayiti 2075 team for assistance.";

  // 🔄 Buttons from hero dictionary
  const backToHomepageLabel =
    homeDict.hero?.backToHomepage ?? "Back to homepage";
  const tryDonatingAgainLabel =
    homeDict.hero?.tryDonatingAgain ?? "Try donating again";

  return (
    <main className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
      <section className="w-full max-w-xl rounded-3xl bg-white border border-slate-200 shadow-lg px-6 py-10 text-center">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-700 text-2xl">
          !
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          {title}
        </h1>

        {/* Main message */}
        <p className="text-slate-600 text-sm sm:text-base mb-4">
          {body}
        </p>

        {/* Help note */}
        <p className="text-xs sm:text-sm text-slate-400 mb-8">
          {helpNote}
        </p>

        {/* Actions (labels from hero) */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-800 px-5 py-2 text-sm font-medium text-slate-900 hover:bg-slate-900 hover:text-white transition"
          >
            {backToHomepageLabel}
          </Link>

          <Link
            href={`/${locale}#donate`}
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition"
          >
            {tryDonatingAgainLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
