import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import image from "../../assets/img.jpg";

const Home = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      gsap.set([contentRef.current, imageRef.current, ".hero-btn"], { visibility: "visible", opacity: 1 });
      return;
    }

    let ctx = gsap.context(() => {
      gsap.set([contentRef.current, imageRef.current, ".hero-btn"], { 
        visibility: "visible" 
      });

      const tl = gsap.timeline({
        delay: 0.1, 
        defaults: { 
          ease: "expo.out", 
          duration: 1,
          force3D: true 
        }
      });

      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0 }
      )
      .fromTo(imageRef.current, 
        { opacity: 0, scale: 0.98, x: 15 }, 
        { opacity: 1, scale: 1, x: 0 },
        "<0.1"
      )
      .fromTo(".hero-btn", 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 }, 
        "-=0.7"
      );
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      style={{ contain: 'paint' }}
      className="relative min-h-[90vh] fontOutfit mt-10 md:h-screen flex flex-col-reverse md:flex-row items-center justify-between max-w-[1200px] mx-auto px-6 py-16 md:py-24"
    >
      <div 
        ref={contentRef} 
        style={{ visibility: 'hidden' }}
        className="flex-1 space-y-5 text-center md:text-left will-change-[opacity,transform]"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight ">
          Hi, I’m <span className="text-indigo-600">Gautam Mishra</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl ">
          I’m a passionate <span className="text-indigo-500">Full-Stack Developer</span> who loves building modern web applications with clean design and powerful functionality.
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
          <a href="#project" className="hero-btn px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-transform active:scale-95 will-change-transform">
            View My Work
          </a>
          <a href="#contact" className="hero-btn px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium hover:bg-indigo-600 hover:text-white transition-transform active:scale-95 will-change-transform">
            Contact Me
          </a>
        </div>
      </div>

      <div 
        ref={imageRef} 
        style={{ visibility: 'hidden' }} 
        className="flex-1 flex items-center justify-center mb-8 md:mb-0 will-change-[opacity,transform]"
      >
        <div className="relative w-40 md:w-60 rounded-full overflow-hidden shadow-2xl border border-white/10">
          <img 
            src={image} 
            alt="Profile" 
            fetchPriority="high" 
            decoding="async"
            className="object-cover object-top-right w-full h-full filter grayscale" 
          />
        </div>
        <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />
      </div>
    </section>
  );
};

export default Home;
