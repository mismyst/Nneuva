import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import "./app.css";
import OurWork from "./components/OurWork";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <OurWork/>

    </div>
  );
}