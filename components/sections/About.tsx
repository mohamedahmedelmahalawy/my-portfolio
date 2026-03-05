"use client";
import Image from "next/image";
import AnimatedHeaderSection from "../animated-header-section/AnimatedHeaderSection";
import { useRef } from "react";
import AnimatedTextLines from "../animated-text-lines/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function About() {
  const imgRef = useRef<HTMLImageElement>(null);
  const text = `I empower brands and startups to dominate their market 
                  with high-impact, premium web and app solutions 
                  that drive real growth.`;
  const aboutText = `web apps — from interactive React frontends to scalable Next.js backends. Every line of code is crafted for performance and smooth user experience.

When I’m not coding:
• 🚀 Teaching JavaScript and React at ITI — sharing knowledge with the next generation of developers
• 🎥 Building frontend projects and experimenting with modern tools like Tailwind CSS, Shadcn/UI, and GSAP
• 💡 Exploring new technologies and keeping up with the latest in web development
• 🖌️ Creating motion graphics and animations with After Effects, Photoshop, and Illustrator`;

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });
    gsap.set(imgRef.current, {
      clipPath: "clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: imgRef.current,
      },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle="Code with Purpose, Built to scale"
        title="About"
        text={text}
        textColor="text-white"
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16  px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-white/60">
        <Image
          ref={imgRef}
          src="/images/man.jpg"
          alt="man"
          width={400}
          height={400}
          className="w-md rounded-3xl "
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
}

export default About;
