
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import DecryptedText from './DecryptedText';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;

    if (!section || !heading || !tagline || !cta) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial state
    gsap.set([heading, tagline, cta], { opacity: 0, y: 20 });

    // Animation sequence
    tl.to(heading, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
      .to(tagline, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      id="hero"
    >
      {/* Decorative elements */}
      <div className="blur-circle w-[300px] h-[300px] bg-portfolio-purple/30 -top-20 -left-20"></div>
      <div className="blur-circle w-[400px] h-[400px] bg-portfolio-purple/20 bottom-0 right-0"></div>

      <div className="container mx-auto px-4 text-center z-10 max-w-5xl">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Hi, I'm <span className="text-gradient">
            <DecryptedText 
              text="Arsen Duli" 
              animateOn="view" 
              speed={30} 
              sequential={true}
              maxIterations={15}
              className="text-gradient" 
              encryptedClassName="text-white opacity-80"
            />
          </span>
          <br />
          <DecryptedText 
            text="Web Developer & Designer" 
            animateOn="view" 
            speed={20} 
            sequential={true}
            maxIterations={10}
            className="text-white" 
            encryptedClassName="text-white/50"
            delay={1000}
          />
        </h1>

        <p
          ref={taglineRef}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          <DecryptedText 
            text="From vision to code – I craft high-performance, modern websites" 
            animateOn="view" 
            speed={15} 
            sequential={true}
            className="text-muted-foreground" 
            encryptedClassName="text-muted-foreground/50"
          />
          <br className="hidden md:block" /> 
          <DecryptedText 
            text="that redefine digital experiences." 
            animateOn="view" 
            speed={15} 
            sequential={true}
            className="text-muted-foreground" 
            encryptedClassName="text-muted-foreground/50"
          />
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4 items-center">
          <Button
            size="lg"
            className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-white px-8 py-6"
          >
            Explore My Work
          </Button>
          <Link to="/#contact">
            <Button
              size="lg"
              variant="outline"
              className="border-portfolio-purple/50 hover:border-portfolio-purple text-white px-8 py-6"
            >
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <Link to="/#about" className="flex flex-col items-center text-muted-foreground hover:text-white transition-colors">
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
