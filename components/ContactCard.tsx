
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactCard() {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-2 text-blue-900">Contact Information</h3>
          <p className="flex items-center gap-2 text-gray-700">
            <MapPin size={18} className="text-pink-600" />
            Port-au-Prince, Haiti
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <Phone size={18} className="text-pink-600" />
            +509 43607248
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-1">
            <Phone size={18} className="text-pink-600" />
            +1 918-640-8249
          </p>
          <p className="flex items-center gap-2 text-gray-700 mt-2">
            <Mail size={18} className="text-purple-600" />
            nouvoayiti2075@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}
