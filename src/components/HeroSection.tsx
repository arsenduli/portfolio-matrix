
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from '@/lib/SplitText';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const logo = logoRef.current;
    const circles = circlesRef.current;

    if (!section || !heading || !tagline || !cta || !logo || !circles) return;

    // Create split text instances
    const splitHeading = new SplitText(heading, { type: "chars,words" });
    const splitTagline = new SplitText(tagline, { type: "chars,words" });
    
    // Set initial states
    gsap.set([splitHeading.chars, splitTagline.chars, cta], { opacity: 0 });
    gsap.set(logo, { scale: 0, rotation: -5 });
    gsap.set(circles.querySelectorAll('.circle'), { scale: 0, opacity: 0 });
    
    // Get circle elements
    const circleEls = circles.querySelectorAll('.circle');
    
    // Main timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Logo animation
    tl.to(logo, { 
      scale: 1, 
      opacity: 1, 
      rotation: 0,
      duration: 1.2, 
      ease: "elastic.out(1, 0.3)"
    })
    // Animate circles
    .to(circleEls, { 
      scale: 1, 
      opacity: 1, 
      duration: 0.8, 
      stagger: 0.1,
      ease: "back.out(1.7)"
    }, "-=0.5")
    // Animate heading characters
    .to(splitHeading.chars, { 
      opacity: 1, 
      y: 0, 
      duration: 0.03, 
      stagger: 0.03,
      ease: "back.out(2)"
    }, "-=0.3")
    // Animate tagline
    .to(splitTagline.chars, { 
      opacity: 1, 
      duration: 0.01, 
      stagger: 0.01
    }, "-=0.1")
    // Animate CTA buttons
    .to(cta, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8,
      stagger: 0.2
    }, "-=0.2");
    
    // Floating animations for decorative elements
    gsap.to(circleEls, {
      y: "random(-15, 15)",
      x: "random(-15, 15)",
      rotation: "random(-10, 10)",
      duration: "random(2, 4)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.1
    });

    // Clean up
    return () => {
      tl.kill();
      splitHeading.revert();
      splitTagline.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
      id="hero"
    >
      {/* Decorative circles */}
      <div ref={circlesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="circle blur-circle w-[300px] h-[300px] bg-portfolio-purple/30 absolute -top-20 -left-20"></div>
        <div className="circle blur-circle w-[400px] h-[400px] bg-portfolio-purple/20 absolute bottom-0 right-0"></div>
        <div className="circle blur-circle w-[200px] h-[200px] bg-portfolio-purple/15 absolute top-1/3 right-20"></div>
        <div className="circle blur-circle w-[150px] h-[150px] bg-portfolio-purple/25 absolute bottom-40 left-20"></div>
      </div>

      {/* Logo animation */}
      <div ref={logoRef} className="absolute top-10 left-10 md:left-20 z-10 reveal-item">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="AD WebDev Logo" className="h-16 md:h-20 w-auto filter drop-shadow-[0_0_8px_rgba(155,135,245,0.6)]" />
        </div>
      </div>

      <div className="container mx-auto px-4 text-center z-10 max-w-5xl">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 reveal-item"
        >
          Hi, I'm <span className="text-gradient">Arsen Duli</span>
          <br />
          Web Developer & Designer
        </h1>

        <p
          ref={taglineRef}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto reveal-item"
        >
          From vision to code – I craft high-performance, modern websites
          <br className="hidden md:block" /> that redefine digital experiences.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-4 items-center reveal-item">
          <Button
            size="lg"
            className="bg-portfolio-purple hover:bg-portfolio-purple/90 text-white px-8 py-6 interactive"
          >
            Explore My Work
          </Button>
          <Link to="/#contact">
            <Button
              size="lg"
              variant="outline"
              className="border-portfolio-purple/50 hover:border-portfolio-purple text-white px-8 py-6 interactive"
            >
              Get In Touch
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link to="/#about" className="flex flex-col items-center text-muted-foreground hover:text-white transition-colors interactive">
          <span className="mb-2 text-sm">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
