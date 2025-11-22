"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { useRef } from "react";

const contactsData = [
  {
    label: "GitHub",
    image: "/github-logo.png",
    link: "https://github.com/pseudoparenchymatous",
    z: "2",
    cardStyle: "md:translate-x-3/1 md:-translate-y-1/2 md:scale-[0.75] md:rotate-20",
  },
  {
    label: "LinkedIn",
    image: "/linkedin-logo.png",
    link: "https://linkedin.com/in/georey-saliente",
    z: "1",
    cardStyle: "md:translate-x-2/1 md:-translate-y-1/2 md:scale-[0.75] md:rotate-20",
  },
  {
    label: "Email",
    image: "/gmail-logo.png",
    link: "mailto:georeysaliente@gmail.com",
    z: "0",
    cardStyle: "md:translate-x-1/1 md:-translate-y-1/2 md:scale-[0.75] md:rotate-20",
  },
];

export default function Contact() {
  const contactSectionRef = useRef(null);

  useGSAP(() => {
    const contactSection = contactSectionRef.current;
    const contacts = gsap.utils.toArray(".contact");
    const contactCards = gsap.utils.toArray(".contact-card");

    let cardPlaceholderEntrance = null;
    let cardSlideAnimation = null;

    function initAnimation () {
      if (cardPlaceholderEntrance) {
        cardPlaceholderEntrance.kill();
      }
      if (cardSlideAnimation) {
        cardSlideAnimation.kill();
      }

      if (window.innerWidth < 1000) {
        contacts.forEach(contact => {
          gsap.set(contact, { clearProps: "all" });
        });
        contactCards.forEach(card => {
          gsap.set(card, { clearProps: "all" });
        });

        return;
      }

      cardPlaceholderEntrance = ScrollTrigger.create({
        trigger: contactSection,
        start: "top bottom",
        end: "top top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          contacts.forEach((contact, index) => {
            const entranceDelay = 0.15;
            const entranceDuration = 0.7;
            const entranceStart = index * entranceDelay;
            const entranceEnd = entranceStart + entranceDuration;

            if (progress >= entranceStart && progress <= entranceEnd) {
              const contactEntranceProgress = (progress - entranceStart) / entranceDuration;

              const entranceY = 125 - contactEntranceProgress * 125;
              gsap.set(contact, { y: `${entranceY}%` });
            } else if (progress > entranceEnd) {
              gsap.set(contact, { y: `0%` });
            }

          });
        },
      });
      
      cardSlideAnimation = ScrollTrigger.create({
        trigger: contactSection,
        start: "top top",
        end: `+=${window.innerHeight * 3}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          contactCards.forEach((card, index) => {
            const slideInStagger = 0.075;
            const xRotationDuration = 0.4;
            const xRotationStart = index * slideInStagger;
            const xRotationEnd = xRotationStart + xRotationDuration;

            if (progress >= xRotationStart && progress <= xRotationEnd) {
              const cardProgress = (progress - xRotationStart) / xRotationDuration;

              const cardInitialX = 300 - index * 100;
              const cardTargetX = -50;
              const cardSlideInX = cardInitialX + cardProgress * (cardTargetX - cardInitialX);
              const cardSlideInRotation = 20 - cardProgress * 20;

              gsap.set(card, {
                x: `${cardSlideInX}%`,
                rotation: cardSlideInRotation,
              });
            } else if (progress > xRotationEnd) {
              gsap.set(card, {
                x: `-50%`,
                rotation: 0,
              });
            }

            const cardScaleStagger = 0.12;
            const cardScaleStart = 0.4 + index * cardScaleStagger;
            const cardScaleEnd = 1;

            if (progress >= cardScaleStart && progress <= cardScaleEnd) {
              const scaleProgress = (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
              const scaleValue = 0.75 + scaleProgress * 0.25;

              gsap.set(card, {
                scale: scaleValue,
              });
            } else if (progress > cardScaleEnd) {
              gsap.set(card, {
                scale: 1,
              });
            }
          });
        },
      });
    }

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initAnimation();
        ScrollTrigger.refresh();
      }, 250);
    });

    initAnimation();
  }, []);

  return (
    <section 
      ref={contactSectionRef}
      id="contactSection"
      className="relative w-full h-[250svh] overflow-hidden p-15 flex flex-col items-center gap-10 md:flex-row md:h-svh md:items-start"
    >
      {contactsData.map(contact => (
        <div 
          key={contact.label}
          className={"contact max-w-[400px] flex-1 relative w-full h-full border-1 border-dashed rounded-xl translate-y-0! will-change-transform md:translate-y-5/4 z-" + contact.z}
        >
          <div className="contact-initial"></div>
          <a 
            href={contact.link}
            target="_blank"
            className={"contact-card text-black absolute top-1/2 left-1/2 -translate-1/2 scale-[1] rotate-0 w-[calc(100%+4px)] h-[calc(100%+4px)] p-9 flex flex-col items-center gap-9 bg-neutral-200 border-2 rounded-xl hover:underline will-change-transform " + contact.cardStyle}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-white w-full">
              <img className="w-full h-full object-cover" src={contact.image} alt={contact.label}/>
            </div>
            <div className="contact-info">
              <h5 className="uppercase font-bold text-5xl flex items-center">
                {contact.label} <ExternalLink size={40}/>
              </h5>
            </div>
          </a>
        </div>
      ))}
    </section>
  );
}
