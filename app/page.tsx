"use client";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import ContactSummary from "@/components/sections/ContactSummary";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Services from "@/components/sections/Services";
import ServiceSummary from "@/components/sections/ServiceSummary";
import Works from "@/components/sections/Works";
import { useProgress } from "@react-three/drei";
import ReactLenis from "lenis/react";

export default function Home() {
  const { progress } = useProgress();
  const isReady = progress === 100;
  console.log(progress);
  return (
    <ReactLenis root className="ralative w-screen min-h-screen overflow-x-auto">
      {!isReady && (
        <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 font-light">
          <p className="mb-4 text-xl tracking-widest animate-pulse">
            Loading {Math.floor(progress)}%
          </p>
          <div className="relative h-1 overflow-hidden rounded w-60 bg-white/20">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 bg-white"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
      <div
        className={`${isReady ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
      >
        <Navbar />
        <Hero />
        <ServiceSummary />
        <Services />
        <About />
        <Works />
        <ContactSummary />
        <Contact />
      </div>
    </ReactLenis>
  );
}
