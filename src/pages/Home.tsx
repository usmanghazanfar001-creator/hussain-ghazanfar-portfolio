import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import MotionStudio from '../components/MotionStudio';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Seo from '../components/Seo';
import Services from '../components/Services';
import Skills from '../components/Skills';
import Statement from '../components/Statement';
import { homeMeta } from '../lib/routes';

const meta = homeMeta();

export default function Home() {
  return (
    <>
      <Seo meta={meta} />
      <Hero />
      <Marquee />
      <Portfolio />
      <Statement />
      <Services />
      <About />
      <Process />
      <MotionStudio />
      <Skills />
      <Contact />
    </>
  );
}
