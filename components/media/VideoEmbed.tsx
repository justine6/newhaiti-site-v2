import React from 'react';

type Props = {
  url: string;
  title?: string;
  className?: string;
};

/**
 * Smart video embedder:
 * - YouTube: https://www.youtube.com/watch?v=ID  or https://youtu.be/ID
 * - Vimeo:   https://vimeo.com/ID
 * - Drive:   https://drive.google.com/file/d/ID/view
 * - Dropbox: https://www.dropbox.com/s/<hash>/<file>?dl=0  -> ?raw=1 for <video>
 * - OneDrive: https://onedrive.live.com/embed?resid=...  -> <iframe>
 * - Direct files: .mp4, .m4v, .webm, .ogg -> <video controls>
 * - HLS: .m3u8 -> <video> (Safari OK; for other browsers add hls.js later)
 */
export default function VideoEmbed({ url, title, className }: Props) {
  const ytMatch = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{6,})/i.exec(url);
  const vimeoMatch = /vimeo\.com\/(\d+)/i.exec(url);
  const driveMatch = /drive\.google\.com\/file\/d\/([^/]+)\//i.exec(url);
  const oneDriveEmbed = /onedrive\.live\.com\/embed/i.test(url);

  const isMp4Like = /\.(mp4|m4v|webm|ogg)(\?.*)?$/i.test(url);
  const isHls = /\.m3u8(\?.*)?$/i.test(url);

  // Dropbox: convert ?dl=0 to raw=1 for <video>
  const isDropbox = /dropbox\.com\/s\//i.test(url);
  const dropboxRaw = isDropbox ? url.replace(/(\?dl=0|$)/, m => (m ? '?raw=1' : '?raw=1')) : url;

  let iframeSrc = '';
  let useIframe = false;
  let sourceUrl = dropboxRaw;

  if (ytMatch) {
    iframeSrc = `https://www.youtube.com/embed/${ytMatch[1]}?rel=0`;
    useIframe = true;
  } else if (vimeoMatch) {
    iframeSrc = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    useIframe = true;
  } else if (driveMatch) {
    iframeSrc = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    useIframe = true;
  } else if (oneDriveEmbed) {
    // OneDrive supports direct iframe embeds when the URL already contains /embed
    iframeSrc = url;
    useIframe = true;
  } else if (isMp4Like || isHls || isDropbox) {
    // handled by <video> below
    useIframe = false;
  } else {
    // Fallback: dev-only warning; silent in production
    if (process.env.NODE_ENV !== 'production') {
      return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-4 text-sm text-red-600">
          Unsupported or unrecognized video URL: <code className="break-all">{url}</code>
        </div>
      );
    }
    return null;
  }

  // Shared container with 16:9 aspect
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className={`relative w-full overflow-hidden rounded-xl shadow-sm ${className || ''}`}>
      <div className="pt-[56.25%]" />
      <div className="absolute inset-0">{children}</div>
    </div>
  );

  if (useIframe) {
    return (
      <Wrapper>
        <iframe
          className="h-full w-full"
          src={iframeSrc}
          title={title || 'Embedded video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </Wrapper>
    );
  }

  // Direct <video> playback (mp4/webm/ogg/m3u8/dropbox raw)
  return (
    <Wrapper>
      <video
        className="h-full w-full"
        controls
        preload="metadata"
        playsInline
        // poster could be added later from JSON if desired
      >
        <source src={sourceUrl} />
        {/* Optional: you can add type hints if you want stricter MIME selection */}
        Your browser does not support the video tag.
      </video>
    </Wrapper>
  );
}
