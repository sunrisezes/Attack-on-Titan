import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Characters() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Image scale down and reveal effect
      gsap.fromTo(imageRef.current,
        { scale: 1.5, filter: "blur(10px)" },
        {
          scale: 1,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "center center",
            scrub: true
          }
        }
      );

      // Text stagger reveal
      const texts = gsap.utils.toArray('.char-text');
      gsap.fromTo(texts,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "center center",
            scrub: true
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-[#111] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          ref={imageRef}
          className="w-full h-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(/scouts.jpg)' }}
        />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#111_100%)]" />
      </div>

      {/* Content */}
      <div ref={textRef} className="z-10 text-center flex flex-col items-center">
        <h2 className="char-text text-5xl md:text-7xl font-bold mb-4 uppercase tracking-widest text-white drop-shadow-xl">
          The Survey Corps
        </h2>
        <p className="char-text text-xl md:text-3xl font-light text-gray-300 max-w-2xl px-4 italic drop-shadow-md">
          "If you win, you live. If you lose, you die. If you don't fight, you can't win."
        </p>
        <div className="char-text mt-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-lg font-medium text-gray-400">
          <div className="uppercase tracking-widest">Eren Yeager</div>
          <div className="uppercase tracking-widest">Mikasa Ackerman</div>
          <div className="uppercase tracking-widest">Armin Arlert</div>
          <div className="uppercase tracking-widest">Levi Ackerman</div>
        </div>
      </div>
    </div>
  );
}
