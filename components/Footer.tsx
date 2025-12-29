import Link from "next/link";

type FooterNav = {
  join?: string;
  vision?: string;
  projects?: string;
  blog?: string;
};

type FooterSocial = {
  facebook?: string;
  youtube?: string;
};

type FooterDictionary = {
  orgName?: string;
  tagline?: string;
  copyrightPrefix?: string;
  rightsReserved?: string;
  contactLabel?: string;
  contactEmailLabel?: string;
  contactEmail?: string;
  followUsLabel?: string;
  builtBy?: string;        // ✅ needed
  deployedOn?: string;     // ✅ needed
  nav?: FooterNav;
  social?: FooterSocial;
};

type FooterProps = {
  locale: string;
  dictionary?: FooterDictionary;
};

export default function Footer({ locale, dictionary }: FooterProps) {
  const year = new Date().getFullYear();

  const orgName = dictionary?.orgName ?? "Nouvo Ayiti 2075";
  const tagline =
    dictionary?.tagline ?? "Restoring dignity. Rebuilding hope.";
  const copyrightPrefix = dictionary?.copyrightPrefix ?? "©";
  const rightsReserved = dictionary?.rightsReserved ?? "All rights reserved.";

  const contactLabel = dictionary?.contactLabel ?? "Contact";
  const contactEmailLabel = dictionary?.contactEmailLabel ?? "Email";
  const contactEmail =
    dictionary?.contactEmail ?? "info@nouvoayiti2075.com";

  const followUsLabel = dictionary?.followUsLabel ?? "Follow us";

  const nav = dictionary?.nav ?? {};
  const social = dictionary?.social ?? {};

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-start md:justify-between">
        {/* Left: identity */}
        <div className="space-y-2 text-sm text-slate-700">
          <div className="font-semibold">{orgName}</div>
          <div className="text-slate-500">{tagline}</div>
          <div className="text-xs text-slate-400">
            {copyrightPrefix} {year} {orgName}. {rightsReserved}
          </div>
        </div>

        {/* Middle: key navigation */}
        <nav className="text-sm text-slate-700">
          <div className="font-semibold mb-2">
            {dictionary?.nav?.join ?? "Explore"}
          </div>
          <ul className="space-y-1">
            <li>
              <Link
                href={`/${locale}/join`}
                className="hover:underline"
              >
                {nav.join ?? "Join the movement"}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/vision`}
                className="hover:underline"
              >
                {nav.vision ?? "Vision"}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/projects`}
                className="hover:underline"
              >
                {nav.projects ?? "Projects"}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/blog`}
                className="hover:underline"
              >
                {nav.blog ?? "Blog"}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right: contact + social */}
        <div className="space-y-3 text-sm text-slate-700">
          <div>
            <div className="font-semibold">{contactLabel}</div>
            <div className="mt-1 text-slate-500">
              {contactEmailLabel}{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium hover:underline"
              >
                {contactEmail}
              </a>
            </div>
          </div>

          <div>
            <div className="font-semibold">{followUsLabel}</div>
            <div className="mt-2 flex items-center gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label={social.facebook ?? "Facebook"}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900"
              >
                {/* Simple Facebook icon */}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-white text-xs font-bold">
                  f
                </span>
                <span>{social.facebook ?? "Facebook"}</span>
              </a>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label={social.youtube ?? "YouTube"}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900"
              >
                {/* Simple YouTube icon */}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-800 text-xs font-bold">
                  ▶
                </span>
                <span>{social.youtube ?? "YouTube"}</span>
              </a>
            </div>
          </div>
        </div>
        </div>

        {/* Attribution line */}
        <div className="border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          {dictionary?.builtBy ?? "Developed by"}{" "}
          <a
            href="https://justinelonglat-lane.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            Justine Longla-T
          </a>{" "}
          {dictionary?.deployedOn ?? "and deployed on"}{" "}
          <a
            href="https://justinelonglat-lane.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            justinelonglat-lane.com
          </a>
        </div>
    </footer>
  );
}
