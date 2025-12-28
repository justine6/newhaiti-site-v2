import { getDictionary } from "@/lib/i18n/get-dictionary";
import ContactSection from "@/components/ContactSection";
import ContactCard from "@/components/ContactCard";

type ContactPageProps = {
  params: { locale?: string };
};

export default async function ContactPage({ params }: ContactPageProps) {
  const locale = (params.locale ?? "en") as string;
  const dict = await getDictionary(locale);

  const contact =
    (dict as any).contact ??
    (dict as any).home?.contact ??
    {};

  return (
    <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <ContactSection dictionary={contact} />
      <ContactCard dictionary={contact} />
    </main>
  );
}
