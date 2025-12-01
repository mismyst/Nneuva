import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import OurWork from "./components/OurWork";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import PlansCards from "./components/PlansCards";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    
    <div>
      <Navbar />
      <HeroSection/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <OurWork/>
      <br></br>
       <br></br>
        <br></br> <br></br>
         <br></br>
          <br></br>
          <Services/>
      <Testimonials/>
      <br></br>
      <br></br>
      <PlansCards/>
      <Footer/>
      
      
      

    </div>
    
  );
}