// components/VideoEmbed.tsx
'use client';

type VideoEmbedProps = {
  title: string;
  embedUrl: string; // Full iframe src from YouTube, Facebook, etc.
};

export default function VideoEmbed({ title, embedUrl }: VideoEmbedProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="aspect-video bg-slate-100">
        <iframe
          src={embedUrl}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      </div>
    </div>
  );
}

