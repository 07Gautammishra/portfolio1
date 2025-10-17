import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Import assets (assuming these paths are correct)
import project1 from "../../assets/chatsGptLight.png";
import project1Dark from "../../assets/chatsGptDark.png";
import project2 from "../../assets/project2light.png";
import project2Dark from "../../assets/project2dark.png";
import project4 from "../../assets/project4.png";
import project3 from "../../assets/novabyte.png";
import { useAppContext } from "../../context/AppContext";
import ScrollGradientText from "../textAnimation/ScrollGradientText";

const Project = () => {
  const { theme } = useAppContext();

  const projectlist = [
    {
      title: "ChatsGPT",
      dec: "ChatsGPT is a web-based AI chat app where users can send text or image prompts, and the AI responds with text or generated images. It uses Google Gemini and ImageKit for AI-powered content generation and delivery.",
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
      dec: "A gaming-themed landing page built with HTML, CSS, and JavaScript, featuring a futuristic design, hero section with “REDEFINE Gaming,” a nav bar, and a watch trailer button — showcasing layout, design, and basic interactivity for beginners.",
      image: project3,
      live: "https://07gautammishra.github.io/firstGamingWeb/",
      github: "https://github.com/07Gautammishra/firstGamingWeb",
    },
    {
      title: "NovaByte",
      dec: "A gaming-themed landing page built with HTML, CSS, and JavaScript, featuring a futuristic design, hero section with “REDEFINE Gaming,” a nav bar, and a watch trailer button — showcasing layout, design, and basic interactivity for beginners.",
      image: project4,
      live: "",
      github: "https://github.com/07Gautammishra/x-clone",
    },
  ];

  // 1. Create a useRef array to store references to the project items
  const projectRefs = useRef([]);
  // Function to add refs to the array
  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  useEffect(() => {
    // 2. Initialize GSAP Context for component scoping
    const ctx = gsap.context(() => {

      // --- Project Item Animations (Staggered Fade-in on Scroll) ---
      projectRefs.current.forEach((project, i) => {
        gsap.from(project, {
          opacity: 0,
          y: 60, // Replicates initial: { y: 60 }
          // Replicates transition: { delay: i * 0.2 }
         
          ease: "power2.out",
          scrollTrigger: {
            trigger: project,
            start: "top 80%", 
            scrub: 1,
            once: true// Start animation when the project item is 80% up the viewport
             // Only run once (replicates viewport: { once: true })
            // The amount: 0.3 is visually replicated by the 80% start position
          },
        });
      });
      
    }); // End of gsap.context()

    // 3. Cleanup function: Revert all animations when the component unmounts
    return () => ctx.revert();
  }, [projectlist.length]); // Re-run if the number of projects changes

  // Clear refs on unmount to prevent errors
  useEffect(() => {
    return () => (projectRefs.current = []);
  }, []);


  return (
    <section
      id="project"
      className="w-[90%] max-w-[800px] mx-auto py-16 fontOutfit"
    >
      <h1 className="text-4xl md:text-6xl logo_font text-center mb-16">
        Projects
      </h1>

      <div className="flex flex-col gap-20">
        {projectlist.map((project, i) => (
          <div // Replaced motion.div with standard div
            key={i}
            ref={addToRefs} // Attach ref using the function
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="max-[756px]:w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg hover:scale-[1.02] transition-transform duration-500">
              <img
                src={project.image}
                alt={project.title}
                className=" w-full md:w-[500px] object-cover rounded-2xl"
              />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {project.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                <ScrollGradientText text={project.dec}/>
              </p>

              <div className="flex justify-center md:justify-start gap-4">
                {project.live.length >0?<a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg font-medium text-white 
                             bg-gradient-to-r from-blue-500 to-purple-600 
                             hover:from-purple-600 hover:to-pink-500 
                             transition-all duration-500"
                >
                  Live Demo
                </a>: ''}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg font-medium text-white 
                             bg-gradient-to-r from-gray-700 to-gray-900 
                             hover:from-indigo-600 hover:to-purple-700 
                             transition-all duration-500"
                >
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