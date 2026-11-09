import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Statement from "@/components/Statement";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Schedule from "@/components/Schedule";
import Contact from "@/components/Contact";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Services />
        <WhyUs />
        <Schedule />
        <Contact />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
