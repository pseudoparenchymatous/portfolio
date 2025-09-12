"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center py-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
          Hi — I’m Georey Saliente.
          <br /> I build full‑stack web apps that help teams deliver real value.
        </h2>
        <p className="mt-4 text-lg opacity-80">
          I design and build reliable, maintainable applications using Laravel on the backend
          and React on the frontend. I enjoy turning product problems into clean, tested
          implementations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#projects" className="px-4 py-2 bg-indigo-600 text-white rounded-md">View projects</a>
          <a href="#contact" className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md">Get in touch</a>
        </div>
      </motion.div>


      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.12 }} className="mx-auto w-full max-w-md">
        <div className="rounded-2xl p-6 bg-gray-50 dark:bg-gray-800 shadow-lg">
          <div className="h-56 rounded-lg bg-gradient-to-br from-indigo-200 to-pink-200 dark:from-indigo-700 dark:to-pink-700 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-semibold">Your Photo</div>
              <div className="mt-2 text-sm opacity-80">Replace with your portrait</div>
            </div>
          </div>
          <div className="mt-4 text-sm opacity-90">
            <p>Location: Philippines • Open to work • Available for freelance or project work.</p>
          </div>
          <div className="mt-4 flex gap-3">
            <a href="#" aria-label="GitHub" className="p-2 rounded-md border border-gray-200 dark:border-gray-700"><Github size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="p-2 rounded-md border border-gray-200 dark:border-gray-700"><Linkedin size={18} /></a>
            <a href="#contact" aria-label="Email" className="p-2 rounded-md border border-gray-200 dark:border-gray-700"><Mail size={18} /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
