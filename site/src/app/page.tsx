import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Pillars } from "@/components/Pillars";
import { Services } from "@/components/Services";
import { Supply } from "@/components/Supply";
import { About } from "@/components/About";
import { ClientMarquee } from "@/components/ClientMarquee";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CircuitRail } from "@/components/CircuitRail";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <CircuitRail />
        <Hero />
        <Pillars />
        <Services />
        <Supply />
        <About />
        <ClientMarquee />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
