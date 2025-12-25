import { getDictionary, Locale } from "@/lib/i18n/get-dictionary";

type Props = {
  params: { locale: Locale };
};

export default async function VideosPage({ params }: Props) {
  // ✅ Fix: await params before using
  const { locale } = await Promise.resolve(params);
  const dict = await getDictionary(locale, "videos");

  return (
    <section className="relative mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl mb-4 text-center">
        {dict.title}
      </h1>
      <p className="mt-2 max-w-2xl text-lg text-gray-600 text-center mx-auto">
        {dict.description}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
        {dict.items?.map((video: any, idx: number) => (
          <div
            key={idx}
            className="rounded-xl overflow-hidden shadow-lg bg-white"
          >
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={video.url}
                title={video.title}
                className="w-full h-64 sm:h-72"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {video.title}
              </h2>
              <p className="mt-2 text-sm text-gray-600">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
