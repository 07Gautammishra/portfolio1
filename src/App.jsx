import React, { useEffect, useRef, Suspense, lazy } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Load Hero components immediately
import Navbar from "./component/navbar/Navbar.jsx";
import Home from "./component/home/Home.jsx";

// Lazy load sections below the fold
const About = lazy(() => import("./component/about/About.jsx"));
const Skill = lazy(() => import("./component/skill/Skill.jsx"));
const Project = lazy(() => import("./component/project/Project.jsx"));
const Contact = lazy(() => import("./component/contact/Contact.jsx"));

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef(null);
  useEffect(() => {
  // Whenever the window loads or the DOM changes, refresh GSAP
  window.addEventListener("load", () => ScrollTrigger.refresh());
  
  // Optional: Refresh after a short delay to account for lazy-loaded images
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => {
    window.removeEventListener("load", () => ScrollTrigger.refresh());
    clearTimeout(timer);
  };
}, []);
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true, // Simplified for performance
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="dark:bg-gradient-to-b from-[#0a0f1f] via-[#111827] to-[#000000] dark:text-white min-h-screen w-full overflow-x-hidden transition-all text-gray-900">
      <Navbar />
      <Home />
      {/* Suspense allows the app to load while heavy components are fetched in the background */}
      <Suspense fallback={<div className="h-screen" />}>
        <About />
        <Skill />
        <Project />
        <Contact />
      </Suspense>
    </div>
  );
};

export default App;
