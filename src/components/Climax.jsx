import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Climax() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pinning and zooming effect
      gsap.to(textRef.current, {
        scale: 5,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",
          pin: true,
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-aot-red flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
        style={{ backgroundImage: 'url(colossal.jpg)' }}
      />
      
      {/* Intense Text */}
      <div ref={textRef} className="z-10 text-center">
        <h1 className="text-7xl md:text-[12rem] font-black text-white uppercase tracking-tighter mix-blend-overlay">
          Rumbling
        </h1>
      </div>
    </div>
  );
}
