import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Showreel from '../components/Showreel';
import Seo from '../components/Seo';
import Services from '../components/Services';
import Skills from '../components/Skills';

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Portfolio />
      <Showreel />
      <Process />
      <Skills />
      <Contact />
    </>
  );
}
