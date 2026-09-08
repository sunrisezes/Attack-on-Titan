import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CharacterSlides() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.char-slide');
      
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (slides.length - 1),
          end: () => "+=" + containerRef.current.offsetWidth * 2
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const characters = [
    { 
      name: "Eren Yeager", 
      title: "The Attack Titan",
      desc: "Driven by an insatiable desire for freedom, Eren's path is soaked in blood. His iron will moves humanity forward, regardless of the cost.", 
      img: "eren.jpg" 
    },
    { 
      name: "Mikasa Ackerman", 
      title: "The Prodigy",
      desc: "Her loyalty is absolute; her blade is lethal. Mikasa stands as the ultimate shield for the ones she loves, a warrior unmatched in grace and brutality.", 
      img: "mikasa.jpg" 
    },
    { 
      name: "Levi Ackerman", 
      title: "Humanity's Strongest",
      desc: "Cold, calculating, and overwhelmingly powerful. Captain Levi's mere presence strikes fear into the hearts of Titans.", 
      img: "levi.jpg" 
    }
  ];

  return (
    <div ref={containerRef} className="w-full h-screen overflow-hidden bg-black relative">
      <div className="w-[300vw] h-full flex">
        {characters.map((char, idx) => (
          <div key={idx} className="char-slide w-screen h-full relative flex items-center justify-start px-12 md:px-32">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-60 mix-blend-screen"
              style={{ backgroundImage: `url(${char.img})` }}
            />
            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-0" />
            
            <div className="z-10 max-w-2xl text-left">
              <p className="text-aot-red tracking-[0.5em] uppercase text-sm md:text-lg mb-4 font-bold">{char.title}</p>
              <h2 className="text-6xl md:text-9xl font-black mb-6 uppercase text-white drop-shadow-lg leading-none">
                {char.name.split(' ')[0]} <br/> <span className="text-gray-400">{char.name.split(' ')[1]}</span>
              </h2>
              <p className="text-xl md:text-3xl font-light text-gray-300 leading-relaxed border-l-4 border-aot-red pl-6">
                {char.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
