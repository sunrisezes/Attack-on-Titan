import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Parallax effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(bgRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out"
      });
      gsap.to(titleRef.current, {
        x: -xPos * 1.5,
        y: -yPos * 1.5,
        duration: 1.5,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initial fade in
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 100 }, 
      { opacity: 1, y: 0, duration: 1.5, ease: "power4.out", delay: 0.2 }
    );
    gsap.fromTo(subtitleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 2, delay: 1 }
    );

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="absolute w-[110vw] h-[110vh] bg-cover bg-center -z-10"
        style={{ backgroundImage: 'url(/hero.jpg)' }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="z-10 text-center flex flex-col items-center">
        <h1 
          ref={titleRef} 
          className="text-8xl md:text-[10rem] font-bold tracking-tighter uppercase"
          style={{ textShadow: '4px 4px 10px rgba(0,0,0,0.8)' }}
        >
          Attack <br /> <span className="text-aot-red text-6xl md:text-8xl">on Titan</span>
        </h1>
        <p 
          ref={subtitleRef}
          className="mt-6 text-xl md:text-2xl font-light tracking-widest uppercase opacity-80"
        >
          Scroll to Explore the Lore
        </p>
      </div>
    </div>
  );
}
