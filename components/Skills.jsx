"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import clsx from "clsx";

gsap.registerPlugin(SplitText);

const skillsList = [
  { name: "My Skills" },
  { name: "HTML", img: "skills/html.jpg" },
  { name: "CSS", img: "skills/css.jpg" },
  { name: "JavaScript", img: "skills/js.jpg" },
  { name: "TypeScript", img: "skills/ts.jpg" },
  { name: "Spring", img: "skills/spring.jpg" },
  { name: "Java", img: "skills/java.jpg" },
  { name: "Laravel", img: "skills/laravel.jpg" },
  { name: "PHP", img: "skills/php.jpg" },
  { name: "Next.js", img: "skills/nextjs.jpg" },
  { name: "React", img: "skills/react.jpg" },
  { name: "Tailwind", img: "skills/tailwind.jpg" },
  { name: "Python", img: "skills/py.jpg" },
  { name: "REST APIs", img: "skills/rest.jpg" },
  { name: "Git", img: "skills/git.jpg" },
  { name: "GitHub", img: "skills/github.jpg" },
  { name: "MySQL", img: "skills/mysql.jpg" },
  { name: "SQLite", img: "skills/sqlite.jpg" },
  { name: "Axure RP", img: "skills/axure.jpg" },
  { name: "Agile / Scrum", img: "skills/agile.jpg" },
  { name: "Linux", img: "skills/linux.jpg" },
];

function SkillImages({ skillImagesRef, skillImagesContainerRef }) {
  return (
    <div 
      ref={skillImagesContainerRef}
      className="w-max max-w-[90%] flex flex-wrap justify-center items-center"
    >
      {skillsList.map((skill, index) => {
        return index !== 0 && (
        <div 
          ref={el => skillImagesRef.current[index] = el}
          key={index}
          className="relative w-[60px] h-[60px] p-[2.5px] cursor-pointer will-change-[width,height] md:w-[70px] md:h-[70px] md:p-[5px]"
        >
            <img 
              src={skill.img}
              alt={skill.name}
              className="w-full h-full object-cover rounded-xl"
            />
        </div>
        );
      })}
    </div>
  );
}

function SkillNames({ skillNamesRef, skillNameContainersRef }) {
  return (
    <div className="skill-names w-full h-[5rem] overflow-hidden md:h-9xl">
      {skillsList.map((skill, index) => (
        <div 
          ref={el => skillNameContainersRef.current[index] = el}
          key={index}
        >
          <span 
            ref={el => skillNamesRef.current[index] = el}
            className={
              clsx(
                "absolute w-full text-center uppercase text-[4rem] font-black select-none md:text-7xl",
                { "text-white -translate-y-1/1": index === 0 },
                { "text-red-500 translate-y-1/1": index !== 0 },
            )}
          >
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const skillImagesContainerRef = useRef(null);
  const skillImagesRef = useRef([]);
  const skillNameContainersRef = useRef([]);
  const skillNamesRef = useRef([]);

  useGSAP(() => {
    const skillNames = skillNamesRef.current;
    skillNames.forEach(name => {
      const split = new SplitText(name, { type: "chars" });
      split.chars.forEach(char => {
        char.classList.add("letter");
      });
    });

    const skillNameContainers = skillNameContainersRef.current;
    const defaultLetters = skillNameContainers[0].querySelectorAll(".letter");
    gsap.set(defaultLetters, { y: "100%" });

    const skillImages = skillImagesRef.current;
    skillImages.forEach((img, index) => {
      const correspondingName = skillNameContainers[index];
      const letters = correspondingName.querySelectorAll(".letter");

      img.addEventListener("mouseenter", () => {
        gsap.to(img, {
          width: 140,
          height: 140,
          duration: 0.5,
          ease: "power4.out",
        });

        gsap.to(letters, {
          y: "-100%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          }
        });
      });

      img.addEventListener("mouseleave", () => {
        gsap.to(img, {
          width: 70,
          height: 70,
          duration: 0.5,
          ease: "power4.out",
        });
        gsap.to(letters, {
          y: "0%",
          ease: "power4.out",
          duration: 0.75,
          stagger: {
            each: 0.025,
            from: "center",
          },
        });
      });
    });

    const skillImagesContainer = skillImagesContainerRef.current;
    skillImagesContainer.addEventListener("mouseenter", () => {
      gsap.to(defaultLetters, {
        y: "0%",
        ease: "power4.out",
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: "center",
        },
      });
    });
    skillImagesContainer.addEventListener("mouseleave", () => {
      gsap.to(defaultLetters, {
        y: "100%",
        ease: "power4.out",
        duration: 0.75,
        stagger: {
          each: 0.025,
          from: "center",
        },
      });
    });
  }, []);

  return (
    <section
      className="relative h-svh flex flex-col-reverse justify-center items-center gap-6 overflow-hidden md:flex-col"
    >
      <SkillImages skillImagesRef={skillImagesRef} skillImagesContainerRef={skillImagesContainerRef}/>
      <SkillNames skillNameContainersRef={skillNameContainersRef} skillNamesRef={skillNamesRef}/>
    </section>
  );
}
