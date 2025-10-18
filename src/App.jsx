import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap'; // Make sure you have gsap imported
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger

// Register ScrollTrigger, which is necessary for the lenis.on('scroll', ScrollTrigger.update) line
gsap.registerPlugin(ScrollTrigger); 

import Navbar from './component/navbar/Navbar.jsx';
import Home from './component/home/Home.jsx';
import About from './component/about/About.jsx';
import Skill from './component/skill/Skill.jsx';
import Project from './component/project/Project.jsx';
import Contact from './component/contact/Contact.jsx';
import ScrollGradientText from './component/textAnimation/ScrollGradientText.jsx';


const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {

    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        smoothTouch: false,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); 
  useEffect(() => {
    const lenis = lenisRef.current;
    
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
  
      gsap.ticker.lagSmoothing(0);
    }
    return () => {
        if (lenis) {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        }
    };
  }, []); 

  return (
    <div className="dark:bg-gradient-to-b from-[#0a0f1f] via-[#111827] to-[#000000] dark:text-white min-h-screen w-full relative overflow-x-hidden transition-all text-gray-900 scroll-smooth">
      <Navbar/>
      <Home/>
      <About/>
      <Skill/>
      <Project/>
      <Contact/>
    
    </div>
  );
};

export default App;
