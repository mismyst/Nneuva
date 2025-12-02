import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import OurWork from "./components/OurWork";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import PlansCards from "./components/PlansCards";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollReveal from "./components/ScrollReveal";
import BookCall from "./components/BookCall";
//new 's
export default function HomePage() {
  return (
    <div className="space-y-20">
      <Navbar />
      <HeroSection />
      
      <ScrollReveal>
        <OurWork />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <Services />
      </ScrollReveal>
      
      
      <ScrollReveal delay={0.1}>
        <PlansCards />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <BookCall />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Testimonials />
      </ScrollReveal>
      
      <ScrollReveal delay={0.1}>
        <FAQ />
      </ScrollReveal>
      
      <ScrollReveal delay={0.2}>
        <Footer />
      </ScrollReveal>
    </div>
  );
}