// components/JoinForm.tsx
"use client";

import { useState } from "react";

export type JoinFormLabels = {
  nameLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  locationLabel?: string;
  messageLabel?: string;
  submitLabel?: string;
  successMessage?: string;
  spamNote?: string;
};

type JoinFormProps = {
  labels: JoinFormLabels;
  locale: string;
};

export default function JoinForm({ labels, locale }: JoinFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");

  // 🐝 Honeypot and timing anti-spam fields
  const [honeypot, setHoneypot] = useState(""); // hidden text field
  const [startedAt] = useState(() => Date.now()); // timestamp when form renders

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setIsSubmitted(false);
    setError(null);

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          message,
          locale,
          honeypot,   // 👈 matches route.ts honeypot check
          startedAt,  // 👈 matches route.ts timing check
        }),
      });

      const data = await res.json().catch(() => ({} as any));
      console.log("📡 /api/join response:", res.status, data);

      if (!res.ok || !data?.success) {
        setError(
          data?.error ||
            `Server error (status ${res.status}). Please try again later.`
        );
        return;
      }

      // Success
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setMessage("");
      setHoneypot("");
    } catch (err) {
      console.error("❌ /api/join network error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot – hidden from humans, visible to bots */}
      <input
        type="text"
        name="company"              // 👈 use a realistic field name
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="absolute opacity-0 -z-10"
      />

      {/* Hidden timing field (bots ignore timing, humans take a few seconds) */}
      <input type="hidden" name="startedAt" value={startedAt} />

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {labels.nameLabel ?? "Full name"}
        </label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {labels.emailLabel ?? "Email"}
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {labels.phoneLabel ?? "Phone (optional)"}
        </label>
        <input
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {labels.locationLabel ?? "City / Country"}
        </label>
        <input
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-800 mb-1">
          {labels.messageLabel ?? "Message (optional)"}
        </label>
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-slate-300 px-3 py-2 rounded-md text-sm min-h-[96px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Sending…"
          : labels.submitLabel ?? "Join the movement"}
      </button>

      {isSubmitted && !error && (
        <p className="mt-2 text-sm text-green-600 flex items-center gap-2">
          <span aria-hidden="true">✅</span>
          {labels.successMessage ??
            "Thank you for joining! You will receive a confirmation email shortly."}
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <p className="mt-3 text-[11px] text-slate-500">
        {labels.spamNote ?? (
          <>
            We use a simple, privacy-friendly spam check to protect this form.
            If you have trouble submitting, please email us at{" "}
            <a
              href="mailto:info@nouvoayiti2075.com"
              className="underline decoration-dotted"
            >
              info@nouvoayiti2075.com
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
