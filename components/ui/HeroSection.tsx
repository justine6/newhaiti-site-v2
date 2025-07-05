'use client';

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-white min-h-screen"
      style={{ backgroundImage: 'url(/images/haiti-map.jpg)' }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-4">
        <img
          src="/images/newhaitilogo.png"
          alt="New Haiti Logo"
          className="w-40 h-40 rounded-full shadow-lg mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-extrabold">New Haiti Team 2075</h1>
        <p className="text-xl md:text-2xl mt-2">Restoring Dignity. Rebuilding Hope</p>
        <div className="mt-6 flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Read the Vision
          </button>
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Join the Movement
          </button>
        </div>
      </div>
    </section>
  );
}
// force rebuild
