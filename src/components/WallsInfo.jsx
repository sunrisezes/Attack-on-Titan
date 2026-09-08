import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WallsInfo() {
  const containerRef = useRef(null);
  const wallsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.wall-section');
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const walls = [
    { name: "Wall Maria", desc: "The outermost wall, standing at 50 meters tall. It fell in the year 845.", img: "colossal.jpg" },
    { name: "Wall Rose", desc: "The middle wall, protecting the inner cities. Breached, but later reclaimed.", img: "scouts.jpg" },
    { name: "Wall Sina", desc: "The innermost wall, protecting the King and the highest class citizens.", img: "hero.jpg" }
  ];

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden bg-black relative">
      <div 
        ref={wallsRef}
        className="w-[300vw] h-full flex"
      >
        {walls.map((wall, idx) => (
          <div key={idx} className="wall-section w-screen h-full relative flex items-center justify-center">
            {/* Background for each wall */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: `url(${wall.img})` }}
            />
            
            <div className="z-10 text-center max-w-4xl px-8">
              <h2 className="text-6xl md:text-8xl font-black mb-6 uppercase text-aot-red drop-shadow-lg">
                {wall.name}
              </h2>
              <p className="text-2xl md:text-4xl font-light text-gray-300 leading-relaxed">
                {wall.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Decorative lines */}
      <div className="absolute bottom-10 left-10 text-sm tracking-[0.5em] text-gray-500 uppercase">
        Structure // Defense
      </div>
    </div>
  );
}
