import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import gsap from 'gsap';
import { AnimatedTestimonialsDemo } from '@/components/AnimatedTestimonialsDemo';
import { TimelineDemo } from '@/components/TimelineDemo';

const Index = () => {
  useEffect(() => {
    // Initial loading animation
    const tl = gsap.timeline();
    
    // Add a small delay before starting animations
    tl.to('body', { opacity: 1, duration: 0.2 }); // Ensure body is visible
    
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-portfolio-dark text-white overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <AnimatedTestimonialsDemo />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;