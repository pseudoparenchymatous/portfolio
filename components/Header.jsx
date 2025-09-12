"use client";

import { Sun, Moon } from "lucide-react";

export default function Header({ dark, setDark }) {
  return (
    <header className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Georey Saliente — Full-Stack Developer</h1>
        <p className="text-sm opacity-80">Building thoughtful web apps with Laravel &amp; React</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          aria-label="Toggle color scheme"
          className="p-2 rounded-md bg-gray-100 dark:bg-gray-800">
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <a href="#contact" className="hidden sm:inline-block px-4 py-2 bg-indigo-600 text-white rounded-md">Contact</a>
      </div>
    </header>
  );
}
