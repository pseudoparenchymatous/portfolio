import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";

const links = [ 
  {
    label: "Résumé",
    link: "resume.pdf"
  },
  {
    label: "Video Introduction",
    link: "https://youtu.be/poEdf7tx2r0"
  },
  {
    label: "Email",
    link: "mailto:georesaliente@gmail.com"
  }
];

export default function About() {
  const aboutHeadersRef = useRef(null);
  const aboutTextRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: aboutHeadersRef.current,
      start: "top bottom",
      end: "top top",
      srub: 1,
      onUpdate: (self) => {
        const headers = document.querySelectorAll(".about-header");
        gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
        gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
        gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
      },
    });

    ScrollTrigger.create({
      trigger: aboutHeadersRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      onUpdate: (self) => {
        const headers = document.querySelectorAll(".about-header");

        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(headers[0], { y: `${yProgress * 100}%` });
          gsap.set(headers[2], { y: `${yProgress * -100}%` });
        } else {
          gsap.set(headers[0], { y: "100%" });
          gsap.set(headers[2], { y: "-100%" });

          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = 0.2;
          const scale = 1 - scaleProgress * (1 - minScale);

          headers.forEach(header => gsap.set(header, { scale }));
        }
      },
    });

    const aboutText = aboutTextRef.current;
    aboutText.setAttribute("data-text", aboutText.textContent.trim());

    ScrollTrigger.create({
      trigger: aboutText,
      start: "top 50%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const clipValue = Math.max(0, 100 - self.progress * 100);
        aboutText.style.setProperty("--clip-value", `${clipValue}%`);
      },
    });

  }, []);

  return (
    <>
      <div 
        ref={aboutHeadersRef}
        id="aboutHeaders"
        className="relative w-full h-svh flex flex-col justify-center items-center overflow-hidden"
      >
        <div className="about-header relative w-full px-[2rem] flex justify-center will-change-transform translate-x-full translate-y-0">
          <img className="object-contain dark:bg-zinc-900" src="/about-me.svg" alt="About me header" />
        </div>
        <div className="about-header relative w-full px-[2rem] flex justify-center will-change-transform -translate-x-full translate-y-0 z-2">
          <img className="object-contain dark:bg-zinc-900" src="/about-me.svg" alt="About me header" />
        </div>
        <div className="about-header relative w-full px-[2rem] flex justify-center will-change-transform translate-x-full translate-y-0">
          <img className="object-contain dark:bg-zinc-900" src="/about-me.svg" alt="About me header" />
        </div>
      </div>
      <section 
        id="aboutSection"
        className="relative w-full h-fit mt-[155svh] pt-[2rem] pr-[2rem] pb-[25svh] pl-[2rem] text-center"
      >
        <p ref={aboutTextRef} className="animate-about text-gray-700 relative w-full my-0 mx-auto text-4xl md:text-6xl md:w-[60%] before:absolute before:top-0 before:left-0 before:text-white">
          I enjoy solving real-world problems with technology and aim to become
          a <span className="ttext-green-700 darktext-green-500">full-stack developer</span> contributing to impactful projects.
        </p>
      <div className="mt-10 flex justify-center gap-3">
        {links.map((item, i) => (
          <Link href={item.link} key={i} target="_blank" className="border px-3 py-1 text-sm rounded border-gray-400 dark:border-gray-700 hover:border-green-600">
            {item.label}
          </Link>
        ))}
      </div>
      </section>
    </>
  );
}
