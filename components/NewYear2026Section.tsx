"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type NewYear2026SectionProps = {
  locale?: string;
  className?: string;
};

export default function NewYear2026Section({
  locale = "en",
  className = "",
}: NewYear2026SectionProps) {
  const joinHref = `/${locale}/join`;

  return (
    <section
      id="new-year-2026"
      className={`py-16 px-4 flex justify-center ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="
          max-w-5xl w-full bg-white border border-red-200 rounded-xl
          shadow-md
          hover:shadow-xl hover:-translate-y-1
          transition-transform transition-shadow duration-300
        "
      >
        {/* Top accent line */}
        <div className="h-1 w-full rounded-t-xl bg-gradient-to-r from-red-700 via-red-500 to-black" />

        {/* Inner content */}
        <div className="px-6 sm:px-10 pb-10 pt-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <Image
              src="/images/newhaitilogo.png"
              alt="Nouvo Ayiti 2075"
              width={110}
              height={110}
            />
          </div>

          {/* Heading */}
          <p className="text-xs tracking-[0.2em] text-red-700 mb-1 uppercase">
            BON LANNE 2026
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-6">
            NOUVO AYITI 2075
          </p>

          {/* Main Creole message */}
          <div className="space-y-4 text-left text-[13px] sm:text-[14px] leading-relaxed text-gray-800">
            <p className="font-semibold">
              Nouvo Ayiti 2075
            </p>

            <p>
              Pou tout frè ak sè nou yo  ki nan tout peyi DAyiti.
              pou tout konpatriyòt  nou yo ki nan dyaspora a,
              pou tout fanm ak gason vanyan ki kwè nan diyite, linyon,  ak nan demen miyò.
            </p>

            <p>
              Nou swete yo: Bon  lanne 2026!
            </p>

            <p>
              Lanne 2025 lan te difisil anpil. Pikan kwenna te simaye tribòbabò, se vre!
              Men, tout moun ka wè klè se pa sèlman latwoublay k ap dodomeya nan peyi nou,
              paske gen fanm ak gason konsekan ki kanpe dyanm pou sa chanje.
              Nan fon nanm yo gen yon gwo limyè lespwa k ap limen e ki refize tenyen.
            </p>

            <p>
              Chanjman kòmanse ak sila yo ki pa janm sispann kwè.
              Nou menm ak tout fanmi nou, zanmi nou yo, granmoun tankou timoun,
              ansanm ak manm nou yo... se prèv ki montre Ayiti poko pèdi karaktè l,
              bèlte l ak desten l.
            </p>

            <p>
              Pèp Ayisyen, Ekip Nouvo AYITI 2075 lan pran angajman douvan listwa
              pou rantre nan batay la ak nou nan lide pou n chanje sitiyasyon yo Ansanm.
            </p>

            <p>
              Nouvo Ayiti 2075 renouvle angajman l pou nou nan lanne 2026 la.
            </p>

            <p>
              🌿 Kenbe diyite<br />
              🏗 Rebati espwa<br />
              🤝 Rete nan  linyon<br />
              🇭🇹 Ansanm n ap bati yon lavni miyò
            </p>

            <p>
              Nou swete pou 2026 la pote
            </p>

            <p>
              ✨ Gerizon<br />
              ✨ Jistis<br />
              ✨ Lapè<br />
              ✨ Fòs Kouraj<br />
              ✨ Pwogrè nan Tèt Ansanm!
            </p>

            <p>
              Ak tout kè nou, n ap di nou
              Mèsi anpil pou konfyans nou.
              Ann mache ansanm — pou Ayiti jodi a, ak Ayiti nou reve  2075 lan!
            </p>

            <p className="text-lg font-semibold text-center">🔴🔵</p>

            <p className="font-semibold text-center">
              Nou se pèp la. Nou se Ayiti. Nou se avni Peyi a
            </p>

            <p className="italic mt-4">
              Avèk lanmou ak lonè respè:
            </p>
            <p className="font-semibold">
              Ekip Nouvo Ayiti 2075
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex justify-center">
            <Link
              href={joinHref}
              className="
                inline-flex items-center justify-center
                rounded-full px-8 py-2.5
                bg-red-600 text-white text-sm font-semibold tracking-wide
                shadow-sm
                transition-transform transition-shadow duration-200
                hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-red-500 focus-visible:ring-offset-2
              "
            >
              Join the Movement
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
