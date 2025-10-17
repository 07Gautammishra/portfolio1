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
  // 1. Use useRef to hold the Lenis instance so it persists across renders
  const lenisRef = useRef(null);

  // --- Lenis Initialization and RAF Loop Setup ---
  useEffect(() => {
    // 2. Initialize Lenis inside useEffect for client-side execution
    const lenis = new Lenis({
        duration: 1.2, // A smooth duration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // A nice ease-out-quint
        smoothTouch: false,
    });
    lenisRef.current = lenis; // Store the instance in the ref

    // 3. Set up the Request Animation Frame (RAF) loop for Lenis
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 4. Cleanup function: Destroy Lenis on component unmount
    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  // --- GSAP ScrollTrigger Integration ---
  useEffect(() => {
    const lenis = lenisRef.current;
    
    if (lenis) {
      // 1. Tell Lenis to call ScrollTrigger.update on every scroll
      lenis.on('scroll', ScrollTrigger.update);

      // 2. Tell GSAP's ticker to drive Lenis's RAF
      // We pass the time provided by GSAP's ticker to lenis.raf(time * 1000)
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      
      // 3. Remove GSAP's lag smoothing to keep everything synchronized
      gsap.ticker.lagSmoothing(0);
    }
    
    // Cleanup function: Remove the Lenis listener and GSAP ticker callback
    return () => {
        if (lenis) {
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        }
    };
  }, []); // Empty dependency array ensures this runs only once after lenis is set up

  return (
    <div id="root-container" className="dark:bg-gradient-to-b from-[#0a0f1f] via-[#111827] to-[#000000] dark:text-white overflow-x-hidden transition-all text-gray-900">
      {/* Removed h-screen and scroll-smooth. Lenis handles the height and scrolling now. */}
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