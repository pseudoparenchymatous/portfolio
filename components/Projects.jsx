"use client";

import { Github } from "lucide-react";

const projects = [
  {
    title: "Meals on Wheels",
    description: "A real-time web application for a charitable meal delivery platform — full-stack app built with Laravel, React, MySQL.",
    tags: ["Laravel", "React", "MySQL", "TailwindCSS", "shadcn/ui"],
    img: "meals-on-wheels.png",
    link: "https://github.com/pseudoparenchymatous/meals-on-wheels" 
  },
  {
    title: "Jumpstart",
    description: "An AI-powered chatbot that answers customer questions in real time. Integrated Google Gemini with a Next.js + React + TailwindCSS frontend to deliver a smooth user experience.",
    tags: ["Next.js", "React", "TailwindCSS", "Google Gemini", "AI"],
    img: "jumpstart.png",
    link: "https://github.com/pseudoparenchymatous/jumpstart-chatbot" 
  },
  {
    title: "Enomy Finances",
    description: "A finance manager system. Includes user authentication and management, transaction history, currency conversion, and investment calculator.",
    tags: ["Spring", "Java", "JSP", "Hibernate"],
    img: "enomy.png",
    link: "https://github.com/pseudoparenchymatous/enomy-finances" 
  },
  {
    title: "DoBu Martial Arts",
    description: "A promotional site for a martial arts academy showcasing classes, schedules, and facility features.", 
    tags: ["HTML", "CSS", "JavaScript"], 
    img: "dobu.png",
    link: "https://github.com/pseudoparenchymatous/dobu-website" 
  },
];

export default function Projects() {
  return (
    <section id="projects" className="mt-12 mx-auto w-[600px]">
      <h3 className=" text-2xl">Featured Projects</h3>
      <div className="mt-5 grid md:grid-cols-2 gap-10">
        {projects.map(p => (
          <article key={p.title} className="md:grayscale hover:grayscale-0 transition duration-300">
            <div className="border-2 border-green-600">
              <img src={p.img} alt="Portrait" width={600} height={333}/>
            </div>
            <h4 className="mt-3 text-2xl font-semibold">{p.title}</h4>
            <p className="mt-2 text-sm opacity-85">{p.description}</p>
            <div className="flex items-center justify-between">
              <div className="mt-3 flex flex-wrap gap-3 text-green-600 dark:text-green-300">
                {p.tags.map((t) => (
                  <span key={t} className="text-sm">{t}</span>
                ))}
              </div>
              <div className="mt-3">
                <a href={p.link} className="inline-flex items-center gap-2 p-2 rounded-full" rel="noopener noreferrer">
                  <Github/>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
