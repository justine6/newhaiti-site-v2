"use client";

export type ContactFormDictionary = {
  title?: string;
  subtitle?: string;
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
};

type ContactFormProps = {
  dictionary?: ContactFormDictionary;
};

export default function ContactForm({ dictionary }: ContactFormProps) {
  const title = dictionary?.title ?? "Contact";
  const subtitle =
    dictionary?.subtitle ??
    "Send a message and we’ll get back to you shortly.";

  const nameLabel = dictionary?.nameLabel ?? "Name";
  const emailLabel = dictionary?.emailLabel ?? "Email";
  const phoneLabel = dictionary?.phoneLabel ?? "Phone (optional)";
  const messageLabel = dictionary?.messageLabel ?? "Message";
  const submitLabel = dictionary?.submitLabel ?? "Send";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center">
        {title}
      </h2>

      <p className="mt-2 text-sm sm:text-base text-slate-600 text-center">
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {nameLabel}
            </label>
            <input
              name="name"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-800 mb-1">
              {emailLabel}
            </label>
            <input
              type="email"
              name="email"
              className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1">
            {phoneLabel}
          </label>
          <input
            name="phone"
            className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-800 mb-1">
            {messageLabel}
          </label>
          <textarea
            name="message"
            className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm min-h-[120px] resize-y"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
