import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import emailjs from "@emailjs/browser";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    // Refs for EmailJS form handling
    const form = useRef();
    
    // Refs for GSAP animations
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const formContainerRef = useRef(null);
    const socialIconsRef = useRef(null);
    const buttonRef = useRef(null);

    // State for form submission logic
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState("");

    // --- GSAP Setup ---
    useEffect(() => {
        const ctx = gsap.context(() => {

            const animationDefaults = {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", // Start animation when the section hits 85% down the viewport
                   
                },
            };

            // 1. Heading Animation
            gsap.from(headingRef.current, {
                ...animationDefaults,
                delay: 0,
            });

            // 2. Form Animation (triggered slightly after the heading)
            gsap.from(formContainerRef.current, {
                ...animationDefaults,
                scrollTrigger: {
                    trigger: formContainerRef.current,
                    start: "top 95%", 
                    
                },
            });

            // 3. Social Icons Animation (triggered slightly after the form)
            gsap.from(socialIconsRef.current, {
                ...animationDefaults,
                scrollTrigger: {
                    trigger: socialIconsRef.current,
                    start: "top 95%", 
                },
            });

            // --- Interactive Animations (Replacing whileHover/whileTap) ---
            
            // 4. Button Hover/Tap Effects
            const button = buttonRef.current;
            if (button) {
                gsap.to(button, { 
                    scale: 1.05, 
                    duration: 0.3, 
                    paused: true, 
                    ease: "power2.out",
                    overwrite: true,
                }).reverse(); // Use reverse() to pause it initially
                
                button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.05, duration: 0.3 }));
                button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3 }));
                button.addEventListener('mousedown', () => gsap.to(button, { scale: 0.97, duration: 0.15 }));
                button.addEventListener('mouseup', () => gsap.to(button, { scale: 1.05, duration: 0.15 }));
            }

            // 5. Social Icon Hover/Tap Effects
            const socialIcons = gsap.utils.toArray(socialIconsRef.current.children);
            socialIcons.forEach(icon => {
                icon.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.15, rotate: 5, duration: 0.3 }));
                icon.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3 }));
                icon.addEventListener('mousedown', () => gsap.to(icon, { scale: 0.9, duration: 0.1 }));
                icon.addEventListener('mouseup', () => gsap.to(icon, { scale: 1.15, rotate: 5, duration: 0.2 }));
            });

        }, sectionRef); // Scope the animation

        // Cleanup function: Revert all animations and remove listeners
        return () => {
            if (buttonRef.current) {
                buttonRef.current.removeEventListener('mouseenter', () => {});
                buttonRef.current.removeEventListener('mouseleave', () => {});
                buttonRef.current.removeEventListener('mousedown', () => {});
                buttonRef.current.removeEventListener('mouseup', () => {});
            }
            // Add similar cleanup for social icon listeners if necessary for complex setups
            ctx.revert();
        };
    }, []);

    // --- Email Sending Logic (Remains unchanged) ---
    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);
        setError("");

        emailjs
            .sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY      
            )
            .then(
                () => {
                    setIsSending(false);
                    setIsSent(true);
                    form.current.reset();
                    setTimeout(() => setIsSent(false), 4000);
                },
                (error) => {
                    setIsSending(false);
                    setError("Something went wrong. Please try again.");
                    console.error("EmailJS Error:", error);
                }
            );
    };

    return (
        <section
            ref={sectionRef} // Attach section ref
            id="contact"
            className="w-full max-w-[700px] mx-auto py-16 px-6 fontOutfit text-center"
        >
            {/* Heading */}
            <h1
                ref={headingRef} // Attach ref for GSAP animation
                className="text-4xl md:text-6xl logo_font mb-10"
            >
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Me
                </span>
            </h1>

            {/* Contact Form */}
            <form
                ref={(el) => { form.current = el; formContainerRef.current = el; }} // Attach both form ref and GSAP ref
                onSubmit={sendEmail}
                className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 
                    rounded-2xl shadow-lg p-8 flex flex-col gap-6 text-left"
            >
                {/* Name */}
                <div className="relative">
                    <input
                        type="text"
                        name="from_name"
                        required
                        className="peer w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 
                        bg-transparent outline-none text-gray-800 dark:text-gray-200
                        focus:border-blue-500 dark:focus:border-purple-500 transition"
                    />
                    <label
                        className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm 
                        peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-blue-500 
                        dark:peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:text-xs 
                        transition-all duration-300"
                    >
                        Name
                    </label>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        name="from_email"
                        required
                        className="peer w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 
                        bg-transparent outline-none text-gray-800 dark:text-gray-200
                        focus:border-blue-500 dark:focus:border-purple-500 transition"
                    />
                    <label
                        className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm 
                        peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-blue-500 
                        dark:peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:text-xs 
                        transition-all duration-300"
                    >
                        Email
                    </label>
                </div>

                {/* Message */}
                <div className="relative">
                    <textarea
                        name="message"
                        required
                        rows="5"
                        className="peer w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 
                        bg-transparent outline-none text-gray-800 dark:text-gray-200
                        focus:border-blue-500 dark:focus:border-purple-500 transition resize-none"
                    ></textarea>
                    <label
                        className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 text-sm 
                        peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-blue-500 
                        dark:peer-focus:text-purple-400 peer-valid:-translate-y-6 peer-valid:text-xs 
                        transition-all duration-300"
                    >
                        Message
                    </label>
                </div>

                {/* Button */}
                <button
                    ref={buttonRef} // Attach ref for interactive animation
                    type="submit"
                    disabled={isSending}
                    className={`mt-4 py-3 w-full rounded-xl font-semibold text-white 
                        ${isSending ? "opacity-70 cursor-not-allowed" : ""}
                        bg-gradient-to-r from-blue-500 to-purple-600 
                        hover:from-purple-600 hover:to-pink-500 
                        dark:from-gray-700 dark:to-gray-900 
                        dark:hover:from-indigo-600 dark:hover:to-purple-700 
                        shadow-md hover:shadow-xl transition-shadow duration-500`}
                >
                    {isSending ? "Sending..." : "Send Message"}
                </button>

                {isSent && (
                    <p className="text-green-500 text-center font-medium mt-2">
                        ✅ Message Sent Successfully!
                    </p>
                )}
                {error && (
                    <p className="text-red-500 text-center font-medium mt-2">{error}</p>
                )}
            </form>
            
            {/* Social Icons */}
            <div
                ref={socialIconsRef} // Attach ref for GSAP animation
                className="flex justify-center gap-6 mt-10"
            >
                {[
                    {
                        icon: FaGithub,
                        link: "https://github.com/07Gautammishra",
                        color: "from-gray-600 to-black",
                    },
                    {
                        icon: FaLinkedin,
                        link: "https://www.linkedin.com/in/gautam-mishra-32102a361/",
                        color: "from-blue-400 to-blue-700",
                    },
                    {
                        icon: FaInstagram,
                        link: "https://www.instagram.com/gautammishra1000/",
                        color: "from-pink-500 to-orange-400",
                    },
                ].map(({ icon: Icon, link, color }, i) => (
                    <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full bg-gradient-to-br ${color} text-white shadow-md 
                        hover:shadow-xl transition-all duration-300`}
                    >
                        <Icon className="text-2xl" />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Contact;