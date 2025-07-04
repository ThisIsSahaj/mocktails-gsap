import { ScrollTrigger, SplitText } from "gsap/all"
import gsap from "gsap"
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Cocktails from "./components/Cocktails";
import Lenis from "lenis";
import { useEffect } from "react";
import About from "./components/About";

//  Registering both these plugins globally across the App
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {

  // Using LENIS for smooth scroll
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);


    return (
      <main>
        <Navbar />
        <Hero />
        <Cocktails />
        <About />
      </main>
    )
}

export default App