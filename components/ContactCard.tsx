'use client';

type ContactCardProps = {
  dictionary: {
    title: string;
    emailLabel?: string;
    emailValue?: string;
    phoneLabel?: string;
    phoneValue?: string;
    addressLabel?: string;
    addressValue?: string;
  };
};

export default function ContactCard({ dictionary }: ContactCardProps) {
  return (
    <section className="py-16 px-4 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-6">
        {dictionary.title || 'Contact Us'}
      </h2>
      <div className="max-w-md mx-auto space-y-4 text-left">
        {dictionary.emailLabel && dictionary.emailValue && (
          <div>
            <strong>{dictionary.emailLabel}:</strong>{' '}
            <a href={`mailto:${dictionary.emailValue}`} className="text-blue-600 hover:underline">
              {dictionary.emailValue}
            </a>
          </div>
        )}
        {dictionary.phoneLabel && dictionary.phoneValue && (
          <div>
            <strong>{dictionary.phoneLabel}:</strong>{' '}
            <a href={`tel:${dictionary.phoneValue}`} className="text-blue-600 hover:underline">
              {dictionary.phoneValue}
            </a>
          </div>
        )}
        {dictionary.addressLabel && dictionary.addressValue && (
          <div>
            <strong>{dictionary.addressLabel}:</strong>{' '}
            <span>{dictionary.addressValue}</span>
          </div>
        )}
      </div>
    </section>
  );
}
