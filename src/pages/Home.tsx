import About from '../components/About';
import Contact from '../components/Contact';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Process from '../components/Process';
import Seo from '../components/Seo';
import Services from '../components/Services';
import Skills from '../components/Skills';

export default function Home() {
  return (
    <>
      <Seo path="/" />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Skills />
      <Contact />
    </>
  );
}
