import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./component/navbar/Navbar.jsx";
import Home from "./component/home/Home.jsx";
import About from "./component/about/About.jsx";
import Skill from "./component/skill/Skill.jsx";
import Project from "./component/project/Project.jsx";
import Contact from "./component/contact/Contact.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: window.innerWidth > 768,
      smoothTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker as the main RAF driver
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="dark:bg-gradient-to-b from-[#0a0f1f] via-[#111827] to-[#000000] dark:text-white min-h-screen w-full overflow-x-hidden transition-all text-gray-900">
      <Navbar />
      <Home />
      <About />
      <Skill />
      <Project />
      <Contact />
    </div>
  );
};

export default App;
