import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import assets (assuming these paths are correct)
import css from "../../assets/css.png";
import HtmlLogo from "../../assets/html.png";
import Js from "../../assets/js.png";
import ex from "../../assets/ex.png";
import node from "../../assets/node.png";
import reactlogo from "../../assets/react.svg";
import mongo from "../../assets/mongodb.png";
import gsaplogo from "../../assets/gsap.png";
import tailwindlogo from "../../assets/tailwind.png";

gsap.registerPlugin(ScrollTrigger);

const Skill = () => {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    
    // Using a function to manage the ref array (preferred for cleaner cleanup)
    const skillRefs = useRef([]);
    skillRefs.current = []; // Initialize and ensure it's fresh on re-render

    const skills = [
        { src: HtmlLogo, alt: "HTML" },
        { src: css, alt: "CSS" },
        { src: Js, alt: "JavaScript" },
        { src: reactlogo, alt: "React" },
        { src: node, alt: "Node.js" },
        { src: ex, alt: "Express" },
        { src: mongo, alt: "MongoDB" },
        { src: gsaplogo, alt: "GSAP" },
        { src: tailwindlogo, alt: "Tailwind" },
    ];

    // Function to handle adding refs for dynamic elements
    const addToSkillRefs = (el) => {
        if (el && !skillRefs.current.includes(el)) {
            skillRefs.current.push(el);
        }
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading scroll animation
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                   // Should be added to stop re-running on scroll
                    // markers: true, // REMOVED: Should be removed in production
                },
                y: 80,
                opacity: 0,
                duration: 1.3,
                ease: "power3.out",
            });

            // Skill items scroll animation
            gsap.from(skillRefs.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "bottom 50%",
                    scrub: 1,
                    once: true
                },
                y: 30,
                scale: 0.6,
                opacity: 0,
                stagger: 0.15,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Hover animation using GSAP
    const handleMouseEnter = (el) => {
        gsap.to(el, {
            scale: 1.1,
            rotate: 2,
            duration: 0.4,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (el) => {
        gsap.to(el, {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.inOut",
        });
    };

    return (
        <section
            ref={sectionRef}
            id="skill"
            className="w-full max-w-[800px] mx-auto py-14 fontOutfit text-center"
        >
            <h1
                ref={headingRef}
                className="text-4xl md:text-6xl logo_font mb-10"
            >
                Skills
            </h1>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 justify-items-center">
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        ref={addToSkillRefs} 
                        onMouseEnter={() => handleMouseEnter(skillRefs.current[i])}
                        onMouseLeave={() => handleMouseLeave(skillRefs.current[i])}
                        className="group relative flex items-center justify-center 
                            bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                            rounded-2xl p-6 shadow-md
                            hover:from-blue-500 hover:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-pink-600"
                    >
                        <img
                            src={skill.src}
                            alt={skill.alt}
                            loading="lazy"
                            className={`w-10 sm:w-16 md:w-20 transition-transform rounded-full duration-500 ${
                                skill.src === ex ? "dark:invert" : ""
                            }`}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};


export default Skill;
