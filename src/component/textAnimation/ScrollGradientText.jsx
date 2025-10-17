import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Utility to wrap each character in a span
const splitText = (text) => {
  return text.split('').map((char, index) => (
    <span 
      key={index} 
      // Add a class for easy GSAP targeting
      className="char-span"
      // Preserve spaces
      style={{ display: char === ' ' ? 'inline' : 'inline-block' }} 
    >
      {char}
    </span>
  ));
};

const ScrollGradientText = ({ text, className }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Use GSAP to find all the character spans
    const chars = container.querySelectorAll('.char-span');

    // 1. Create a GSAP Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 90%", // Start when the text enters the middle of the viewport
        end: "bottom 50%", // End when the text leaves the middle of the viewport
        scrub: 1, // Link the animation directly to the scrollbar movement
        // markers: true, // Uncomment for debugging
      },
    });

    // 2. Animate the opacity of the characters over the duration of the scroll.
    // We use a staggered array of opacity values.
    // It starts fully transparent (0) and ends fully opaque (1).
    tl.fromTo(chars, {
      opacity: 0.2, // Start mostly faded (to maintain the "gradient" effect)
    }, {
      opacity: 1, // End fully visible
      stagger: {
        each: 0.05, // Stagger the animation of each character
        from: "start", // Start the wave from the beginning of the text
      },
      duration: 1, // This duration is relative to the scroll distance defined by 'start'/'end'
      ease: "none", // Linear transition linked to scroll
    });

    // Cleanup ScrollTrigger instances on unmount
    return () => tl.scrollTrigger.kill();

  }, [text]);

  return (
    <div 
      ref={containerRef} 
      className={` ${className || ''}`}
    >
      {splitText(text)}
    </div>
  );
};

export default ScrollGradientText;