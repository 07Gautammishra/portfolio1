import React, { useLayoutEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';


const ScrollGradientText = ({ text, className }) => {
  const containerRef = useRef(null);

  // Memoize the spans so they don't change on every render
  const words = useMemo(() => {
    return text.split(" ").map((word, i) => (
      <span key={i} className="inline-block mr-1.5 opacity-20 char-item">
        {word}
      </span>
    ));
  }, [text]);

  useLayoutEffect(() => {
    // useLayoutEffect is better for GSAP to prevent "jumps"
    let ctx = gsap.context(() => {
      gsap.to(".char-item", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", 
          end: "bottom 70%",
          scrub: 0.5,
        },
        opacity: 1,
        stagger: 0.1,
        ease: "none",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`${className} flex flex-wrap`}>
      {words}
    </div>
  );
};

export default ScrollGradientText;
