"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import AnimatedHeaderSection from "../animated-header-section/AnimatedHeaderSection";
import { projects } from "@/constants/constants";
import { Icon } from "@iconify/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
function Works() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef<gsap.QuickToFunc | null>(null);
  const moveY = useRef<gsap.QuickToFunc | null>(null);
  useGSAP(() => {
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 1.5,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 2,
      ease: "power3.out",
    });
    gsap.from("#project", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: {
        trigger: "#project",
      },
    });
  });

  const text =
    "Featured projects that have been meticulously crafted with passion to drive innovation and excellence.";

  const mouseEnterHandler = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentImageIndex(index);

    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.15,
        ease: "power2.out",
      },
    );

    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const mouseLeaveHandler = (index: number) => {
    if (window.innerWidth < 768) return;
    setCurrentImageIndex(null);

    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
      ease: "power2.in",
    });

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const mouseMoveHandler = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    mouse.current.x = e.clientX + 24;
    mouse.current.y = e.clientY + 24;
    moveX.current?.(mouse.current.x);
    moveY.current?.(mouse.current.y);
  };
  return (
    <section id="work" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle="Logic meets Aesthetics, Seamlessly."
        title="Works"
        text={text}
        textColor="text-black"
        withScrollTrigger={true}
      />
      <div
        className="relative flex flex-col font-light"
        onMouseMove={mouseMoveHandler}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            id="project"
            className="relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => mouseEnterHandler(index)}
            onMouseLeave={() => mouseLeaveHandler(index)}
          >
            {/* overlay */}
            <div
              ref={(el) => {
                overlayRefs.current[index] = el;
              }}
              className="absolute inset-0 hidden md:block duration-200 bg-black -z-10 clip-path"
            ></div>
            {/* title */}
            <div className="flex justify-between px-10 text-black transition-all duratio-500 md:group-hover:px-12 md:group-hover:text-white">
              <h2 className="lg:text-[32px] text-[26px] leading-none">
                {project.name}
              </h2>
              <Icon
                icon="iconoir:arrow-up-right"
                className="md:size-6 size-5"
              />
            </div>
            {/* divider */}
            <div className="w-full h-0.5 bg-black/80" />

            {/* framework */}
            <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {project.frameworks.map((framework) => (
                <p
                  key={framework.id}
                  className="text-black transition-colors duration-500 md:group-hover:text-white"
                >
                  {framework.name}
                </p>
              ))}
            </div>
            {/* image preview for mobile */}
            <div className="relative flex items-center justify-center px-10 md:hidden h-100">
              <Image
                src={project.bgImage}
                alt={`${project.name}-bg-image`}
                fill
                className="object-cover w-full h-full rounded-md brightness-50"
              />
              <Image
                src={project.image}
                alt={`${project.name}-image`}
                fill
                className="absolute bg-center px-14 rounded-xl"
              />
            </div>
          </div>
        ))}
        {/* desk top floating preview image */}
        <div
          ref={previewRef}
          className="fixed -top-2/6 left-0 z-50 overflow-hidden border-8 border-black pointer-events-none w-240 md:block hidden opacity-0"
        >
          {currentImageIndex !== null && (
            <Image
              src={projects[currentImageIndex].image}
              alt="preview"
              width={1903}
              height={1080}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Works;
