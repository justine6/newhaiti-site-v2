"use client";

import ContactCard, { ContactDictionary } from "./ContactCard";
import NewsletterSection from "./NewsletterSection";
import ContactForm from "./ContactForm";

type ContactSectionProps = {
  newsletterDictionary?: any; // use your existing newsletter type if you prefer
  contactCardDictionary?: ContactDictionary;
};

export default function ContactSection({
  newsletterDictionary,
  contactCardDictionary,
}: ContactSectionProps) {
  return (
    <section id="contact" className="bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* 1) Visitor contact form */}
        <ContactForm />

        {/* 2) Stay Connected (newsletter) */}
        <NewsletterSection dictionary={newsletterDictionary} />

        {/* 3) Static contact details */}
        <ContactCard dictionary={contactCardDictionary} />
      </div>
    </section>
  );
}

