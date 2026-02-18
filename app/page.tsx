import Hero from "@/components/sections/Hero";
import Navbar from "@/components/sections/Navbar";
import ServiceSummary from "@/components/sections/ServiceSummary";

export default function Home() {
  return (
    <main className="ralative w-screen min-h-screen overflow-x-auto">
      <Navbar />
      <Hero />
      <ServiceSummary />
      <section className="min-h-screen"></section>
    </main>
  );
}
