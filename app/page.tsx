import About from "@/components/sections/About";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import Services from "@/components/sections/Services";
import ServiceSummary from "@/components/sections/ServiceSummary";
import Works from "@/components/sections/Works";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root className="ralative w-screen min-h-screen overflow-x-auto">
      <Navbar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
      <section className="min-h-screen"></section>
    </ReactLenis>
  );
}
