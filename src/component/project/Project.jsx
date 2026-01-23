import React, { useLayoutEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAppContext } from "../../context/AppContext";
import ScrollGradientText from "../textAnimation/ScrollGradientText";

// Assets
import project1 from "../../assets/chatsGptLight.png";
import project1Dark from "../../assets/chatsGptDark.png";
import project2 from "../../assets/project2light.png";
import project2Dark from "../../assets/project2dark.png";
import project3 from "../../assets/novabyte.png";
import project4 from "../../assets/project4.png";

const Project = () => {
  const { theme } = useAppContext();
  const containerRef = useRef(null);

  // Memoize project data to prevent re-renders
  const projectlist = useMemo(() => [
    {
      title: "ChatsGPT",
      dec: "ChatsGPT is a web-based AI chat app where users can send text or image prompts, and the AI responds with text or generated images.",
      image: theme === "dark" ? project1Dark : project1,
      live: "https://chatsgpt.onrender.com/",
      github: "https://github.com/07Gautammishra/chatsgpt",
    },
    {
      title: "Product Management",
      dec: "A full-stack product management system for adding, updating, create, delete with persistence.",
      image: theme === "dark" ? project2Dark : project2,
      live: "https://product-store-yzjc.onrender.com/",
      github: "https://github.com/07Gautammishra/firstMernProject",
    },
    {
      title: "NovaByte",
      dec: "A gaming-themed landing page featuring a futuristic design and basic interactivity.",
      image: project3,
      live: "https://07gautammishra.github.io/firstGamingWeb/",
      github: "https://github.com/07Gautammishra/firstGamingWeb",
    },
    {
      title: "Twitter clone",
      dec: "A full-stack social media web app built using React.js, Node.js, Express, MongoDB, and Tailwind CSS.",
      image: project4,
      live: "",
      github: "https://github.com/07Gautammishra/x-clone",
    },
  ], [theme]);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Use toArray to get elements reliably
      const items = gsap.utils.toArray(".project-item");
      
      items.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true // Performance: only animate once
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projectlist]);

  return (
    <section ref={containerRef} id="project" className="w-[90%] max-w-[800px] mx-auto py-16">
      <h1 className="text-4xl md:text-6xl logo_font text-center mb-16">Projects</h1>

      <div className="flex flex-col gap-20">
        {projectlist.map((project, i) => (
          <div 
            key={project.title}
            className={`project-item flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image Container with aspect ratio to fix Cumulative Layout Shift (CLS) */}
            <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 aspect-video">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy" 
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-indigo-500">
                {project.title}
              </h2>
              <div className="text-gray-700 dark:text-gray-300 mb-6">
                <ScrollGradientText text={project.dec} />
              </div>

              <div className="flex justify-center md:justify-start gap-4">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                    Live Demo
                  </a>
                )}
                <a href={project.github} target="_blank" rel="noreferrer" className="px-5 py-2.5 rounded-lg border border-gray-600 dark:border-gray-400 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Project;
