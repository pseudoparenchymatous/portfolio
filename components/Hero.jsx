"use client";

import { vertexShader, fragmentShader } from "@/lib/shader";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useState } from "react";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", ".8, 0, .3, 1");

const Preloader = ({ setIsLoading }) => {
  useGSAP(() => {
    const counter3 = document.querySelector(".counter-3");

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }

    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    function animate(counter, duration, delay = 0) {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration: duration,
        delay: delay,
        ease: "power2.inOut",
      });
    }

    animate(counter3, 5);
    animate(document.querySelector(".counter-2"), 6);
    animate(document.querySelector(".counter-1"), 2, 4);

    let nameSplit = SplitText.create(".my-name", {
      type: "words",
      mask: "words",
    });

    let titleSplit = SplitText.create(".my-title", {
      type: "words",
      mask: "words",
    });

    const tl = gsap.timeline({
      defaults: { ease: "hop" },
      onComplete: () => {
        document.getElementById("preloader").style.display = "none";
        document.getElementById("preloaderOverlay").style.display = "none";
      }
    });
    tl.to("#heroSection", {
      clipPath: "polygon(0 48%, 100% 48%, 100% 52%, 0 52%)",
      duration: 1,
    }, 6)
      .set(".preloader", {
        clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
      }, 7)
      .set(".preloader-overlay", {
        clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
      }, 7)
      .to( [".preloader", ".preloader-overlay"], {
        y: (i) => (i === 0 ? "-50%" : "50%"),
        duration: 1,
      }, 7)
      .to("#heroSection", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
      }, 7)
      .from(nameSplit.words, {
        y: 100,
        stagger: 0.05,
      }, 8).
      from(titleSplit.words, {
        y: 100,
        stagger: 0.05,
      }, 8);

    // If I want to hide the numbers before the reveal
    // gsap.to(".digit", {
    //   top: -150,
    //   stagger: {
    //     amount: 0.25,
    //   },
    //   delay: 6,
    //   duration: 1,
    //   ease: "power4.inOut",
    // });


  }, []);

  return (
    <>
      <div id="preloader" className="preloader fixed w-screen h-svh bg-zinc-900 z-2">
        <div className="counter fixed top-1/2 left-1/2 -translate-1/2 flex h-[100px] text-[100px]/[102px] pointer-events-none">
          <div className="counter-1">
            <div className="num">0</div>
            <div className="num num1-offset1 relative right-[-25px]">1</div>
          </div>
          <div className="counter-2">
            <div className="num">0</div>
            <div className="num num1-offset2 relative right-[-25px]">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
            <div className="num">0</div>
          </div>
          <div className="counter-3">
            <div className="num">0</div>
            <div className="num">1</div>
            <div className="num">2</div>
            <div className="num">3</div>
            <div className="num">4</div>
            <div className="num">5</div>
            <div className="num">6</div>
            <div className="num">7</div>
            <div className="num">8</div>
            <div className="num">9</div>
          </div>
        </div>
      </div>
      <div id="preloaderOverlay" className="preloader-overlay fixed w-screen h-dvh bg-zinc-900 z-1">
        <div className="counter fixed top-1/2 left-1/2 -translate-1/2 flex h-[100px] text-[100px]/[102px] pointer-events-none">
          <div className="">
            <div className="relative right-[-25px]">1</div>
            <div className="">0</div>
          </div>
          <div className="">
            <div className="relative">0</div>
          </div>
          <div className="">
            <div className="num">0</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Hero() {
  const sectionRef = useRef(null);
  const textureImageRef = useRef(null);

  useEffect(() => {
    const config = {
      lerpFactor: 0.03,
      parallaxStrength: 0.1,
      distortionMultiplier: 10,
      glassStrength: 1.0,
      glassSmoothness: 0.0004,
      stripesFrequency: 35,
      edgePadding: 0.1,
    };

    const section = sectionRef.current;
    const textureImage = textureImageRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.getPixelRatio(Math.min(window.devicePixelRatio, 2));
    section.appendChild(renderer.domElement);

    const mouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };
    const textureSize = { x: 1, y: 1 };

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: null },
        uResolution: { 
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        uTextureSize: {
          value: new THREE.Vector2(textureSize.x, textureSize.y),
        },
        uMouse: { value: new THREE.Vector2(mouse.x, mouse.y) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        uStripesFrequency: { value: config.stripesFrequency },
        uGlassSmoothness: { value: config.glassSmoothness },
        uEdgePadding: { value: config.edgePadding },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    function loadImageToShader() {
      const texture = new THREE.Texture(textureImage);
      texture.needsUpdate = true;

      textureSize.x = textureImage.naturalWidth;
      textureSize.y = textureImage.naturalHeight;

      material.uniforms.uTexture.value = texture;
      material.uniforms.uTextureSize.value.set(textureSize.x, textureSize.y);
    }

    if (textureImage.complete) {
      loadImageToShader();
    } else {
      textureImage.onload = loadImageToShader;
    }

    function handleMouseMove(e) {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1- e.clientY / window.innerHeight;
    }

    function handleResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight,
      );
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    function animate() {
      requestAnimationFrame(animate);

      const lerp = (a, b, t) => a + (b - a) * t;

      mouse.x = lerp(mouse.x, targetMouse.x, config.lerpFactor);
      mouse.y = lerp(mouse.y, targetMouse.y, config.lerpFactor);

      material.uniforms.uMouse.value.set(mouse.x, mouse.y);
      renderer.render(scene, camera);
    }

    animate();

  }, []);

  return (
    <>
      <Preloader />
      <section
        ref={sectionRef}
        id="heroSection"
        className="relative w-full h-svh overflow-hidden pointer-events-none z-2"
      >
        <img 
          ref={textureImageRef}
          id="glassTexture"
          src="hero.jpg"
          className="hidden"
          alt="Hero image"
        />
        <div id="heroContent" className="text-white absolute left-0 bottom-0 w-full flex flex-col-reverse p-10 md:flex-row md:justify-between md:items-end">
          <h1 className="my-name text-7xl">Georey S. Saliente</h1>
          <p className="my-title">Software Developer</p>
        </div>
      </section>
    </>
  );
}
