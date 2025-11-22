"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skillsList = [
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

const config = {
  gap: 0.04,
  speed: 0.2,
  arcRadius: 500,
};

const SkillsList = () => {
  return (
    <div className="skills relative left-0 md:left-[15%] w-[75%] h-full flex flex-col gap-[5rem] translate-y-1/1 z-2">
      {skillsList.map((skill, index) => (
        <h5 key={index} className={"text-3xl lg:text-5xl transition-opacity duration-300 ease-in-out " + (index === 0 && "opacity-100" || "opacity-25" ) }>
          {skill.name}
        </h5>
      ))}
    </div>
  )
};

const SkillsImages = ({ skillImagesRef }) => {
  return (
    <div className="skills-images absolute top-0 left-0 w-1/2 min-w-[300px] h-full z-1 pointer-events-none">
      {skillsList.map((skill, index) => (
        <div 
          ref={el => skillImagesRef.current[index] = el} 
          key={index}
          className="absolute w-[270px] h-[150px] will-change-transform"
        >
          <img src={skill.img} alt="" className="w-full h-full object-cover rounded-2xl"/>
        </div>
      ))}
    </div>
  );
};

export default function Skills() {
  const skillImagesRef = useRef([]);
  const bgImgRef = useRef(null);
  const bgImgContainerRef = useRef(null);

  useGSAP(() => {
    const skills = document.querySelector(".skills");
    const sectionHeader = document.querySelector(".section-header");
    const skillsContainer = document.querySelector(".skills-container");
    const introTextElements = document.querySelectorAll(".intro-text");
    const imageElements = skillImagesRef.current;

    const skillNames = skills.querySelectorAll("h5");
    let currentActiveIndex = 0;

    const containerWidth = window.innerWidth * 0.7;
    const containerHeight = window.innerHeight;
    const arcStartX = containerWidth - 220;
    const arcStartY = -200;
    const arcEndY = containerHeight + 200;
    const arcControlPointX = arcStartX + config.arcRadius;
    const arcControlPointY = containerHeight / 2;

    function getBezierPosition(t) {
      const x =
        (1 - t) * (1 - t) * arcStartX +
        2 * (1 - t) * t * arcControlPointX +
        t * t * arcStartX;

      const y =
        (1 - t) * (1 - t) * arcStartY +
        2 * (1 - t) * t * arcControlPointY +
        t * t * arcEndY;
        
      return { x, y };
    }

    function getImgProgressState(index, overallProgress) {
      const startTime = index * config.gap;
      const endTime = startTime + config.speed;

      if (overallProgress < startTime) return -1;
      if (overallProgress > endTime) return 2;

      return (overallProgress - startTime) / config.speed;
    }

    imageElements.forEach(img => gsap.set(img, { opacity: 0 }));

    ScrollTrigger.create({
      trigger: ".skills-section",
      start: "top top",
      end: `+=${window.innerHeight * 10}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progress <= 0.2) {
          const animationProgress = progress / 0.2;

          const moveDistance = window.innerWidth * 0.6;
          gsap.set(introTextElements[0], {
            x: -animationProgress * moveDistance
          });
          gsap.set(introTextElements[1], {
            x: animationProgress * moveDistance
          });
          gsap.set(introTextElements[0], { opacity: 1 });
          gsap.set(introTextElements[1], { opacity: 1 });

          gsap.set(bgImgContainerRef.current, {
            transform: `scale(${animationProgress})`,
          });
          gsap.set(bgImgRef.current, {
            transform: `scale(${1.5 - animationProgress * 0.5})`,
          });

          imageElements.forEach(img => gsap.set(img, { opacity: 0 }));
          sectionHeader.style.opacity = "0";
          gsap.set(skillsContainer, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        } else if (progress > 0.2 && progress <= 0.25) {
          gsap.set(bgImgContainerRef.current, { transform: "scale(1)" });
          gsap.set(bgImgRef.current, { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          imageElements.forEach(img => gsap.set(img, { opacity: 0 }));
          sectionHeader.style.opacity = "1";
          gsap.set(skillsContainer, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });
        } else if (progress > 0.25 && progress <= 0.95) {
          gsap.set(bgImgContainerRef.current, { transform: "scale(1)" });
          gsap.set(bgImgRef.current, { transform: "scale(1)" });

          gsap.set(introTextElements[0], { opacity: 0 });
          gsap.set(introTextElements[1], { opacity: 0 });

          sectionHeader.style.opacity = "1";
          gsap.set(skillsContainer, {
            "--before-opacity": "1",
            "--after-opacity": "1",
          });

          const switchProgress = (progress - 0.25) / 0.7;
          const viewportHeight = window.innerHeight;
          const skillsContainerHeight = skills.scrollHeight;
          const startPosition = viewportHeight;
          const targetPosition = -skillsContainerHeight;
          const totalDistance = startPosition - targetPosition;
          const currentY = startPosition - switchProgress * totalDistance;

          gsap.set(skills, {
            transform: `translateY(${currentY}px)`,
          });

          imageElements.forEach((img, index) => {
            const imageProgress = getImgProgressState(index, switchProgress);

            if (imageProgress < 0 || imageProgress > 1) {
              gsap.set(img, { opacity: 0 });
            } else {
              const pos = getBezierPosition(imageProgress);
              gsap.set(img, {
                x: pos.x - 100,
                y: pos.y - 75,
                opacity: 1
              });
            }
          });

          const viewPortMiddle = viewportHeight / 2;
          let closestIndex = 0;
          let closestDistance = Infinity;

          skillNames.forEach((skillName, index) => {
            const skillRect = skillName.getBoundingClientRect();
            const skillCenter = skillRect.top + skillRect.height / 2
            const distanceFromCenter = Math.abs(skillCenter - viewPortMiddle);

            if (distanceFromCenter < closestDistance) {
              closestDistance = distanceFromCenter;
              closestIndex = index;
            }
          });

          if (closestIndex !== currentActiveIndex) {
            if (skillNames[currentActiveIndex]) {
              skillNames[currentActiveIndex].style.opacity = "0.25";
            }
            skillNames[closestIndex].style.opacity = "1";
            currentActiveIndex = closestIndex;
          }
        } else if (progress > 0.95) {
          sectionHeader.style.opacity = "0";
          gsap.set(skillsContainer, {
            "--before-opacity": "0",
            "--after-opacity": "0",
          });
        }
      }, 
    });
  }, []);

  return (
    <section className="skills-section relative w-vw h-svh overflow-hidden">
      <div className="intro-text-wrapper text-3xl absolute w-full top-[50%] -translate-y-1/2 flex gap-3">
        <div className="intro-text flex justify-end flex-1 relative will-change-transform">Keep</div>
        <div className="intro-text flex-1 relative will-change-transform">Pushing</div>
      </div>

      <div ref={bgImgContainerRef} className="bg-img absolute w-full h-full overflow-hidden scale-0 will-change-transform">
        <img ref={bgImgRef} src="/skills-bg.jpg" alt="" className="w-full h-full object-cover scale-[1.5] will-change-transform"/>
      </div>

      <div className="skills-container absolute top-0 left-[15vw] w-full h-full overflow-hidden">
        <SkillsList />
      </div>

      <SkillsImages skillImagesRef={skillImagesRef} />

      <div className="section-header hidden md:block absolute top-1/2 left-1/10 -translate-y-1/2 text-white opacity-0 transition-opacity duration-300 ease-in-out z-2">
        <h4 className="text-4xl">Skills</h4>
      </div>

    </section>
  );
}
