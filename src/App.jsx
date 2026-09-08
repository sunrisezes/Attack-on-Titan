import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from './components/Hero';
import WallsInfo from './components/WallsInfo';
import Characters from './components/Characters';
import CharacterSlides from './components/CharacterSlides';
import Climax from './components/Climax';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="bg-aot-dark text-white font-sans w-full no-scrollbar">
      <Hero />
      <WallsInfo />
      <Characters />
      <CharacterSlides />
      <Climax />
    </div>
  );
}

export default App;
