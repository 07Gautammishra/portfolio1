import {useLayoutEffect, useRef } from "react";
// Import gsap
import gsap from "gsap";

import image from "../../assets/img.jpg";

const Home = () => {
   

    // Create refs for the elements we want to animate
    const contentRef = useRef(null);
    const imageContainerRef = useRef(null);

    useLayoutEffect(() => {
        // 1. Initialize GSAP Context for component scope and cleanup
        const ctx = gsap.context(() => {

            // 2. Initialize a GSAP Timeline
            const tl = gsap.timeline({
                delay: 0.4, // Add a 0.2-second delay before the entire timeline starts
                defaults: {
                    duration: 0.8,
                    ease: "power2.out",
                }
            });

            // 3. Animation for the Left Content (First in the sequence)
            // The timeline will play this first
            tl.from(contentRef.current, {
                opacity: 0,
                x: 0,
                y: 80, // Start position
            }, "start") // Use a label "start" for positioning the next tween

            // 4. Animation for the Right Image (Second in the sequence)
            // The position parameter "<0.1" starts this animation 0.1 seconds 
            // BEFORE the 'start' label's animation (the content animation) finishes.
            tl.from(imageContainerRef.current, {
                opacity: 0,
                x: 100, // Start position
            }, "<0.1"); // Start 0.1 seconds BEFORE the previous tween ends

            tl.from("#partLike", {
                opacity: 0,
                y: 40,
                stagger: {
                    amount: 0.1
                }
            })
        }, [contentRef, imageContainerRef]); // Scope the animations to these refs

        // Cleanup function: Revert all animations when the component unmounts
        return () => ctx.revert();
    }, []);

    return (
        <section
            id="home"
            className={`relative h-[90vh] mt-10 md:h-screen flex flex-col-reverse md:flex-row items-center justify-between max-w-[1200px] mx-auto px-6 py-16 md:py-24 transition-colors duration-500`}
        >

            {/* Left Content */}
            <div
                ref={contentRef}
                className="flex-1 space-y-5 text-center md:text-left"
            >
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold leading-tight">
                    Hi, I’m <span className="text-indigo-600">Gautam Mishra</span>
                </h1>

                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                    I’m a passionate <span className="text-indigo-500">Full-Stack Developer</span> who loves building modern web applications with clean design and powerful functionality.
                </p>

                <div  className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                    <div id="partLike">

                    <a
                        href="#project"
                        className=" px-6 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                        >
                        View My Work
                    </a>
                        </div>
                    <div id="partLike">
                    <a
                        href="#contact" 
                        className=" px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-medium hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition"
                    >
                        Contact Me
                    </a>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <div
                ref={imageContainerRef}
                className="flex-1 flex items-center justify-center mb-8 md:mb-0"
            >
                <div className="relative w-40 md:w-60 rounded-full  overflow-hidden shadow-2xl backdrop-blur-2xl">
                    <img
                        src={image}
                        alt="Profile"
                        className="object-cover object-top-right w-full h-full  filter grayscale  "
                    />
                </div>

                {/* Glass Glow Effect */}
                <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-indigo-500/20  rounded-full blur-2xl -z-10" />
            </div>
        </section>
    );
};

export default Home;