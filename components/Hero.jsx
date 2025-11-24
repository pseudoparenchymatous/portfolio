"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { vertexShader, fragmentShader } from "@/lib/shader";
import { useEffect, useRef } from "react";
import * as THREE from "three";

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
    <section
      ref={sectionRef}
      id="heroSection"
      className="relative w-full h-svh overflow-hidden pointer-events-none"
    >
      <img 
        ref={textureImageRef}
        id="glassTexture"
        src="hero.jpg"
        className="hidden"
        alt="Hero image"
      />
      <div id="heroContent" className="text-white absolute left-0 bottom-0 w-full flex flex-col-reverse p-10 md:flex-row md:justify-between md:items-end">
        <h1 className="text-7xl">Georey S. Saliente</h1>
        <p>Software Developer</p>
      </div>
    </section>
  );
}
