'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectsSection from '@/components/ProjectsSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("/haiti-map.jpg")' }}>
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 pt-32 pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          New Haiti Team 2075
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-2xl mb-8 max-w-2xl"
        >
          Restoring Dignity. Rebuilding Hope.
        </motion.p>

        <div className="flex gap-4">
          <Button className="bg-red-600 hover:bg-red-700 shadow-lg px-6 py-3 text-lg rounded-full">
            Join the Movement
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 px-6 py-3 text-lg rounded-full">
            Read the Vision
          </Button>
        </div>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-b from-blue-950 to-black text-white px-6 py-20 text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Prezidan Kiawel</h2>
        <p className="text-base md:text-lg max-w-3xl mx-auto">
          Dr. Frantz Lamour discusses the important questions surrounding Prezidan Kiawel and the future of Haiti's leadership.
        </p>
        <p className="text-sm md:text-base mt-4 text-blue-200">
          Video by Ayiti Avèk Doktè Lamour: Exploring Haitian politics, security, and sustainable solutions for Haiti’s future.
        </p>
      </motion.section>

      {/* Projects Section */}
      <ProjectsSection />
    </div>
  );
}
