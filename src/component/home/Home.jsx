import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import image from "../../assets/img.jpg";

const Home = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: "power3.out", duration: 1 }
      });

      tl.from(contentRef.current, { opacity: 0, y: 30 })
        .from(imageRef.current, { opacity: 0, scale: 0.9, x: 30 }, "<0.2")
        .from(".hero-btn", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5 }, "-=0.5");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between max-w-[1200px] mx-auto px-6 py-16 md:py-24"
    >
      <div ref={contentRef} className="flex-1 space-y-5 text-center md:text-left will-change-transform">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Hi, I’m <span className="text-indigo-600">Gautam Mishra</span>
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          I’m a passionate <span className="text-indigo-500">Full-Stack Developer</span>...
        </p>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
          <a href="#project" className="hero-btn px-6 py-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
            View My Work
          </a>
          <a href="#contact" className="hero-btn px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
            Contact Me
          </a>
        </div>
      </div>

      <div ref={imageRef} className="flex-1 flex items-center justify-center mb-8 md:mb-0 will-change-transform">
        <div className="relative w-40 md:w-60 rounded-full overflow-hidden shadow-2xl">
          <img src={image} alt="Profile" fetchpriority="high" className="object-cover grayscale" />
        </div>
        <div className="absolute w-72 h-72 bg-indigo-500/20 rounded-full blur-2xl -z-10" />
      </div>
    </section>
  );
};

export default Home;
