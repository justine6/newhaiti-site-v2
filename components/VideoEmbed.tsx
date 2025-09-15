// components/VideoEmbed.tsx
"use client";

type Props = {
  url: string;
  title: string;
};

export default function VideoEmbed({ url, title }: Props) {
  return (
    <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video">
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
