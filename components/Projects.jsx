"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Meals on Wheels (MerryMeal)",
    description: "Charitable meal delivery platform — full-stack app built with Laravel, React, MySQL.",
    tags: ["Laravel", "React", "MySQL", "TailwindCSS", "shadcn/ui"],
    link: "#" 
  },
  {
    title: "Jumpstart — AI Chatbot",
    description: "Built an AI-powered chatbot that answers customer questions in real time. Integrated Google Gemini with a Next.js + React + TailwindCSS frontend to deliver a smooth user experience.",
    tags: ["Next.js", "React", "TailwindCSS", "Google Gemini", "AI"],
    link: "#"
  },
  {
    title: "DoBu Martial Arts — Marketing Site",
    description: "A promotional site for a martial arts academy showcasing classes, schedules, and facility features.", 
    tags: ["HTML", "CSS", "JavaScript"], 
    link: "#" 
  },
];

export default function Projects() {
  return (
    <section id="projects" className="pt-8">
      <h3 className="text-xl font-semibold">Selected Projects</h3>
      <p className="mt-1 text-sm opacity-80">Case studies, prototypes, and production apps.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.article key={p.title} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }} className="rounded-xl p-5 bg-gray-50 dark:bg-gray-800 shadow-sm">
            <h4 className="text-lg font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm opacity-85">{p.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-white/50 dark:bg-black/30 border">{t}</span>
              ))}
            </div>
            <div className="mt-3">
              <a href={p.link} className="inline-flex items-center gap-2 px-3 py-2 border rounded-md text-sm" rel="noopener noreferrer">View</a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
