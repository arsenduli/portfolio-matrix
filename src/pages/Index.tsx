
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import MouseFollower from '@/components/MouseFollower';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Index = () => {
  const smoothWrapperRef = useRef<HTMLDivElement>(null);
  const smoothContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create smooth scrolling effect
    if (smoothWrapperRef.current && smoothContentRef.current) {
      const smoother = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        normalizeScroll: true,
        smoothTouch: 0.1,
        wrapper: smoothWrapperRef.current,
        content: smoothContentRef.current
      });

      // Initial loading animation
      const tl = gsap.timeline();
      
      // Add page reveal animation
      tl.to('body', { opacity: 1, duration: 0.2 })
        .from('.reveal-item', { 
          y: 100, 
          opacity: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power3.out" 
        }, 0.2);
      
      // Parallax effect for decorative elements
      const parallaxElements = gsap.utils.toArray('.parallax');
      if (parallaxElements.length > 0) {
        parallaxElements.forEach((element) => {
          if (element instanceof Element) {
            gsap.to(element, {
              y: () => -100,
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            });
          }
        });
      }
      
      // Return cleanup function
      return () => {
        tl.kill();
        smoother.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }
  }, []);

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef} className="min-h-screen bg-portfolio-dark text-white overflow-hidden">
      <div id="smooth-content" ref={smoothContentRef}>
        <MouseFollower />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
