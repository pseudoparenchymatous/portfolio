"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col gap-8 py-8 justify-center md:mx-20 lg:flex-row lg:items-end lg:mx-40">
      <div className="flex justify-center">
        <img src="/portrait.png" alt="Portrait" width={600} height={900}/>
      </div>
      <div>
        <span className="text-xl">Software Engineering Student</span>
        <Link href="#about"  className="mt-2 text-9xl font-bold hover:underline">
          <h2 className="hover:cursor-default">
            Georey Saliente
          </h2>
        </Link>
        <div className="mt-4 flex justify-between">
          <div className="flex items-center gap-3">
            <a href="https://github.com/pseudoparenchymatous" target="_blank" aria-label="GitHub" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-600"><Github size={18} /></a>
            <a href="https://linkedin.com/in/georey-saliente" target="_blank" aria-label="LinkedIn" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-600"><Linkedin size={18} /></a>
            {/* <a href="mailto:georeysaliente@gmail.com" aria-label="Email" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:border-green-600"><Mail size={18} /></a> */}
          </div>
          <div className="flex gap-4">
            <a href="#projects" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-500">View projects</a>
            <a href="#contact" className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-md">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
}
