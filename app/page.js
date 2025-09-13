"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Page() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Header dark={dark} setDark={setDark} />
        <main className="max-w-5xl mx-auto px-6 pb-16">
          <Hero />
          <Projects />
          <SkillsExperience />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
