// app/page.tsx
import Image from "next/image";
import NavBar from '@/components/NavBar';

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="pt-24 min-h-screen bg-gradient-to-b from-blue-100 to-white text-center px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Nouvo Ayiti 2075</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          A bold vision to rebuild dignity, restore hope, and empower a new generation of Haitian leadership.
        </p>

        <div className="mt-8">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md shadow-md transition duration-200"
          >
            Join the Movement
          </a>
        </div>

        <section className="mt-24" id="mission">
          <h2 className="text-3xl font-semibold text-gray-900">Our Mission</h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
            New Haiti 2075 is a grassroots initiative focused on civic renewal, education, environmental justice,
            and sustainable development. We believe in empowering local communities to lead the change they want to see.
          </p>
        </section>

        <footer className="mt-24 bg-gray-100 py-10">
          <p className="text-xl font-bold text-gray-800">
            “Restore Dignity. Rebuild Hope.”
          </p>
        </footer>
      </div>
    </>
  );
}
