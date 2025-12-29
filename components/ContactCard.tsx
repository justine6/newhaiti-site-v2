"use client";

export type ContactDictionary = {
  title?: string;
  emailLabel?: string;
  emailValue?: string;
  phoneLabel?: string;
  phoneValue?: string;
  addressLabel?: string;
  addressValue?: string;
};

type ContactCardProps = {
  dictionary?: ContactDictionary;
};

export default function ContactCard({ dictionary }: ContactCardProps) {
  const title = dictionary?.title ?? "Contact the Team";

  const emailLabel = dictionary?.emailLabel;
  const emailValue = dictionary?.emailValue;
  const phoneLabel = dictionary?.phoneLabel;
  const phoneValue = dictionary?.phoneValue;
  const addressLabel = dictionary?.addressLabel;
  const addressValue = dictionary?.addressValue;

  return (
    <section className="py-12 px-4 bg-slate-50 text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">{title}</h2>

      <div className="max-w-md mx-auto space-y-4 text-left text-sm sm:text-base">
        {emailLabel && emailValue && (
          <div>
            <strong>{emailLabel}:</strong>{" "}
            <a
              href={`mailto:${emailValue}`}
              className="text-blue-600 hover:underline"
            >
              {emailValue}
            </a>
          </div>
        )}

        {phoneLabel && phoneValue && (
          <div>
            <strong>{phoneLabel}:</strong>{" "}
            <a
              href={`tel:${phoneValue}`}
              className="text-blue-600 hover:underline"
            >
              {phoneValue}
            </a>
          </div>
        )}

        {addressLabel && addressValue && (
          <div>
            <strong>{addressLabel}:</strong>{" "}
            <span>{addressValue}</span>
          </div>
        )}

        {!emailValue && !phoneValue && !addressValue && (
          <p className="text-gray-500">
            Contact details will be added here soon.
          </p>
        )}
      </div>
    </section>
  );
}

