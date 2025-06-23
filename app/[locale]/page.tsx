'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProjectsSection from '@/components/ProjectsSection';
import ScrollToTop from '@/components/ScrollToTop';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[80vh] bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/haiti-map.jpg")' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 pt-32 pb-20 bg-black/60"
        >
          <Image
            src="/images/newhaitilogo.png"
            alt="New Haiti 2075 Logo"
            width={0}
            height={0}
            sizes="(min-width: 768px) 180px, 120px"
            className="w-[120px] md:w-[180px] h-auto mb-6 rounded-full border-2 border-white shadow-xl bg-white"
          />

<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3, duration: 0.6 }}
  className="text-4xl md:text-6xl font-extrabold mb-4 text-white"
>
  New Haiti Team 2075
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.6 }}
  className="text-lg md:text-2xl mb-8 max-w-2xl text-white"
>
  Restoring Dignity. Rebuilding Hope.
</motion.p>


          <div className="flex gap-4">
            <Button className="bg-red-600 hover:bg-red-700 shadow-lg px-6 py-3 text-lg rounded-full">
              Join the Movement
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-6 py-3 text-lg rounded-full"
            >
              Read the Vision
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
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

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
        className="bg-red-700 text-white px-6 py-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let’s Build the Future Together
        </h2>
        <p className="text-lg italic">
          "Put down your weapons and pick up your tools."
        </p>
      </motion.section>

      {/* Contact Section */}
      <section className="bg-gray-100 px-6 py-20 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          Get in Touch
        </h3>
        <p className="text-lg text-gray-700 mb-10">
          Have questions or want to get involved? Reach out to us.
        </p>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-blue-900 text-left">
            Contact Information
          </h4>
          <ul className="space-y-4 text-left">
            <li className="flex items-center gap-3">
              <span className="text-red-600">📍</span>
              <span>Port-au-Prince, Haiti</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-600">📞</span>
              <a href="tel:+50943607248" className="text-blue-700 hover:underline">
                +509 43607248
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-600">📞</span>
              <a href="tel:9186408249" className="text-blue-700 hover:underline">
                918-640-8249
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-red-600">✉️</span>
              <a href="mailto:nouvoayiti2075@gmail.com" className="text-blue-700 hover:underline">
                nouvoayiti2075@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Scroll to Top */}
      <ScrollToTop />
    </div>
  );
}
