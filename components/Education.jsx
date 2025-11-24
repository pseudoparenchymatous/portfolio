"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const educationData = [
  {
    degree: "Applied Degree in Software Engineering",
    institution: "Lithan Academy",
    years: "2024 – Present",
    bg: "bg-[url(/lithan-academy.jpg)]",
  },
  {
    degree: "Bachelor of Science in Information Technology",
    institution: "University of Cebu",
    years: "2024 – Present",
    bg: "bg-[url(/uc.jpg)]",
  },
];

function EducationCards({ cardsRef }) {
  return (
    <>
      {educationData.map((data, index) => (
        <div 
          ref={el => cardsRef.current[index] = el}
          key={index}
          className={"education-card absolute w-80 h-80 md:w-130 md:h-90 top-3/2 left-1/2 -translate-1/2 rotate-0 flex flex-col justify-between pt-10 pb-30 items-center gap-5 rounded-4xl will-change-transform overflow-hidden border-2 text-black pointer-events-none hover:cursor-default bg-cover " + data.bg }
        >
          <div className="year p-2 rounded-sm bg-neutral-200">
            <span className="text-2xl font-bold" >{data.years}</span>
          </div>
          <div className="card-content w-full text-white text-center">
            <span className="text-lg">{data.degree}</span>
            <h2 className="text-3xl md:text-5xl font-black">{data.institution}</h2>
          </div>
        </div>
      ))}
    </>
  );
}

export default function Education() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const cards = cardsRef.current;
    const cardCount = cards.length;
    const sectionHeight = window.innerHeight * (cardCount + 1);
    const startRotations = [0, 5];
    const endRotations = [10, -5];

    cards.forEach((card, index) => {
      gsap.set(card, { rotation: startRotations[index] });
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${sectionHeight}`,
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress * (cardCount + 1);
        const currentCard = Math.floor(progress);

        if (progress <= 1) {
          gsap.to(headerRef.current, {
            opacity: 1 - progress,
            duration: 0.1,
            ease: "none",
          });
        } else {
          gsap.set(headerRef.current, { opacity: 0 });
        }

        cards.forEach((card, index) => {
          if (index < currentCard) {
            gsap.set(card, {
              top: "50%",
              rotation: endRotations[index],
            });
          } else if (index === currentCard) {
            const cardProgress = progress - currentCard;
            const newTop = gsap.utils.interpolate(150, 50, cardProgress);
            const newRotation = gsap.utils.interpolate(
              startRotations[index],
              endRotations[index],
              cardProgress
            );
            gsap.set(card, {
              top: `${newTop}%`,
              rotation: newRotation,
            });
          } else {
            gsap.set(card, {
              top: "150%",
              rotation: startRotations[index],
            });
          }
        });
      },
    });

  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef}
      className="pinned h-svh overflow-hidden "
    >
      <div 
        ref={headerRef}
        className="sticky-header absolute top-1/2 left-1/2 -translate-1/2 opacity-[1]"
      >
        <h1 className="text-6xl md:text-8xl text-center font-black">Education</h1>
      </div>
      <EducationCards cardsRef={cardsRef} />
    </section>
  );
}
