"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Education from "@/components/Education";
import About from "@/components/About";

export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <div className="dark:bg-zinc-900 text-gray-900 dark:text-slate-100 transition-colors">
      <Header dark={dark} setDark={setDark} />
      <main className="mx-auto px-6 pb-8">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
