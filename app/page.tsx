import Navbar from "@/components/sections/Navbar";

export default function Home() {
  return (
    <main className="ralative w-screen min-h-screen overflow-x-auto">
      <Navbar />
      <section id="home" className="min-h-screen"></section>
      <section id="services" className="min-h-screen bg-amber-200"></section>
      <section id="about" className="min-h-screen bg-SageGray"></section>
      <section id="work" className="min-h-screen bg-amber-500"></section>
    </main>
  );
}
