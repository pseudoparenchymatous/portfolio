"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

const projectsData = [
  {
    title: "Meals on Wheels",
    description: "A real-time web application for a charitable meal delivery platform — full-stack app built with Laravel, React, MySQL.",
    tags: ["Laravel", "React", "MySQL",],
    img: "meals-on-wheels.png",
    link: "https://github.com/pseudoparenchymatous/meals-on-wheels",
    live: "#",
  },
  {
    title: "Jumpstart",
    description: "An AI-powered chatbot that answers customer questions in real time. Integrated Google Gemini with a Next.js + React + TailwindCSS frontend to deliver a smooth user experience.",
    tags: ["Next.js", "React", "Google Gemini",],
    img: "jumpstart.png",
    link: "https://github.com/pseudoparenchymatous/jumpstart-chatbot",
    live: "#",
  },
  {
    title: "Enomy Finances",
    description: "A finance manager system. Includes user authentication and management, transaction history, currency conversion, and investment calculator.",
    tags: ["Spring", "Java", "JSP",],
    img: "enomy.png",
    link: "https://github.com/pseudoparenchymatous/enomy-finances",
    live: "#",
  },
  {
    title: "DoBu Martial Arts",
    description: "A promotional site for a martial arts academy showcasing classes, schedules, and facility features.", 
    tags: ["HTML", "CSS", "JavaScript"], 
    img: "dobu.png",
    link: "https://github.com/pseudoparenchymatous/dobu-website",
    live: "https://pseudoparenchymatous.github.io/dobu-website",
  },
];

export default function Projects() {
  const projectsSectionRef = useRef(null);
  const projectCardsRef = useRef([]);

  useGSAP(() => {
    const projectCards = projectCardsRef.current;
    projectCards.forEach((card, index) => {
      if (index < projectCards.length - 1) {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: projectCards[projectCards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        ScrollTrigger.create({
          trigger: projectCards[index + 1],
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.25;
            const rotation = (index % 2 === 0 ? 5: -5) * progress;
            const afterOpacity = progress;

            gsap.set(card, {
              scale: scale,
              rotation: rotation,
              "--after-opacity": afterOpacity,
            })
          },
        });
      }
    });
  }, { scope: projectsSectionRef });

  return (
    <>
      <section 
        ref={projectsSectionRef}
        className="relative w-full h-full"
      >
        <div className="relative w-full h-[30svh] grid justify-center text-8xl md:text-9xl font-bold">
          <h1>Projects</h1>
        </div>
        {projectsData.map((project, index) => (
          <div 
            ref={el => projectCardsRef.current[index] = el}
            key={index}
            className="project-card relative w-full h-svh bg-neutral-200 text-black p-[1.5rem] flex flex-col gap-0 will-change-transform md:flex-row md:gap-[3rem]"
          >
            <div className="project-card-index text-5xl text-red-700 flex-1 font-bold md:flex-2 ">
              <h2>{"0" + (index + 1)}</h2>
            </div>
            <div className="project-card-content flex-4 pt-[1.5rem]">
              <div className="project-card-content-wrapper w-full flex flex-col gap-[1.5rem] md:w-3/4 ">
                <a href={project.link} target="_blank" className="flex items-center hover:underline">
                  <h3 className="project-card-header text-5xl font-bold w-3/4">{project.title}</h3>
                  <ExternalLink />
                </a>
                <div className="project-card-img">
                  <img 
                    src={project.img}
                    alt=""
                    className="w-full h-full object-cover aspect-16/9"
                  />
                </div>
                <div className="project-card-details flex flex-col gap-[0.5rem] md:flex-row md:gap-[1.5rem]">
                  <div className="project-card-details-tags text-sm text-red-800 flex gap-2 flex-2 uppercase">
                    {project.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-card-details-description flex-4">
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
