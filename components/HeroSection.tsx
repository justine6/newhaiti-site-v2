'use client';

export default function Hero() {
  return (
    <section className="relative text-white min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with one-time zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-zoom-once"
        style={{
          backgroundImage: "url(/images/haiti-hero-map.jpg)", // Your map
        }}
      />

      {/* Semi-transparent overlay to preserve flag colors */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Radial gradient fade behind text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_70%)]" />

      {/* Content container with fade-in animation */}
      <div className="relative z-10 text-center px-4 md:px-6 lg:px-8 animate-fade-in">
        {/* Logo */}
        <img
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-lg mx-auto mb-6"
        />

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">
          Nouvo Ayiti 2075
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-2xl mb-8 drop-shadow-md">
          Restaurer la dignité. Reconstruire l’espoir.
        </p>

        {/* Buttons with scale-in + breathing animation */}
        <div className="flex flex-wrap justify-center gap-4 animate-buttons">
          <a
            href="#vision"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition animate-breathing"
          >
            Lire la vision
          </a>
          <a
            href="#join"
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition animate-breathing"
          >
            Rejoindre le mouvement
          </a>
        </div>
      </div>

      {/* Tailwind animation styles */}
      <style jsx global>{`
        /* Background zoom */
        @keyframes zoom-once {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .animate-zoom-once {
          animation: zoom-once 15s ease-in-out forwards;
        }

        /* Fade in for text */
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-out 1.5s forwards;
          opacity: 0;
        }

        /* Button scale-up after text */
        @keyframes scale-in {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-buttons {
          animation: scale-in 0.8s ease-out 3.8s forwards;
          opacity: 0;
        }

        /* Continuous breathing effect */
        @keyframes breathing {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-breathing {
          animation: breathing 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
