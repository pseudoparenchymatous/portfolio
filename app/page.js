"use client";

import "lenis/dist/lenis.css";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Education from "@/components/Education";
import About from "@/components/About";
import { useEffect, useRef } from "react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const lenisOptions = {
  autoRaf: false,
};

export default function Page() {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis ref={lenisRef} root options={lenisOptions}>
      <div className="w-full bg-zinc-900 text-slate-100 transition-colors">
        <Header/>
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Contact />
          <Footer />
        </main>
      </div>
    </ReactLenis>
  );
}
