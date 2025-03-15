
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const stats = statsRef.current;
    const title = titleRef.current;

    if (!section || !content || !image || !stats || !title) return;

    // Set initial states
    gsap.set(title, { opacity: 0, y: 30 });
    gsap.set(content.querySelectorAll('p, .flex'), { opacity: 0, y: 40 });
    gsap.set(image, { opacity: 0, x: 50 });
    gsap.set(stats, { opacity: 0, scale: 0.9 });
    gsap.set(stats.querySelectorAll('.progress-bar'), { width: 0 });

    // Create the main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate the title
    tl.to(title, { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: "power3.out" 
    })
    // Animate content paragraphs
    .to(content.querySelectorAll('p'), { 
      opacity: 1, 
      y: 0, 
      stagger: 0.2, 
      duration: 0.8 
    }, "-=0.4")
    // Animate buttons
    .to(content.querySelector('.flex'), { 
      opacity: 1, 
      y: 0, 
      duration: 0.8 
    }, "-=0.4")
    // Animate the image panel
    .to(image, { 
      opacity: 1, 
      x: 0, 
      duration: 0.8,
      ease: "power2.out" 
    }, "-=0.6")
    // Reveal stats
    .to(stats, { 
      opacity: 1, 
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)"
    }, "-=0.5")
    // Animate progress bars
    .to(stats.querySelectorAll('.progress-bar'), { 
      width: (i, target) => {
        return target.getAttribute('data-value');
      },
      duration: 1.5,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.5");

    // Hover effects for buttons
    const buttons = content.querySelectorAll('button');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Add parallax effect to the stats bars
    image.querySelectorAll('.progress-bar-container').forEach(bar => {
      gsap.to(bar, {
        y: -10,
        scrollTrigger: {
          trigger: bar,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Floating animation for decorative elements
    gsap.to('.blur-circle', {
      y: "random(-15, 15)",
      x: "random(-15, 15)",
      duration: "random(3, 6)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Clean up
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative">
      <div className="blur-circle w-[400px] h-[400px] bg-portfolio-purple/10 -bottom-20 -left-20 parallax"></div>
      <div className="blur-circle w-[300px] h-[300px] bg-portfolio-purple/5 top-40 right-10 parallax"></div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <h2 ref={titleRef} className="text-gradient text-3xl md:text-4xl font-bold glow-text">About Me</h2>
            <h3 className="text-2xl md:text-3xl font-bold">
              A Passionate Web Developer Focused on Creating Modern Digital Experiences
            </h3>
            <p className="text-muted-foreground text-lg">
              I'm Arsen Duli, a 22-year-old web developer with a passion for creating fast,
              responsive, and SEO-optimized websites that deliver exceptional user experiences.
            </p>
            <p className="text-muted-foreground">
              My journey in web development began with a curiosity about how websites work and has evolved into a 
              professional career where I leverage modern technologies to build digital solutions that stand out.
              I specialize in creating high-performance websites that look great, load quickly, and rank well in search engines.
            </p>
            <p className="text-muted-foreground">
              Whether it's developing a complex e-commerce platform or creating a sleek portfolio site,
              I approach each project with enthusiasm and attention to detail, ensuring that every aspect
              meets the highest standards of quality and performance.
            </p>
            <div ref={statsRef} className="flex flex-wrap gap-4 mt-4 mb-6">
              <div className="glass-panel p-4 text-center w-24 md:w-28 card-hover">
                <div className="text-3xl font-bold text-portfolio-purple mb-1">4+</div>
                <div className="text-xs text-muted-foreground">Years Experience</div>
              </div>
              <div className="glass-panel p-4 text-center w-24 md:w-28 card-hover">
                <div className="text-3xl font-bold text-portfolio-purple mb-1">50+</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="glass-panel p-4 text-center w-24 md:w-28 card-hover">
                <div className="text-3xl font-bold text-portfolio-purple mb-1">40+</div>
                <div className="text-xs text-muted-foreground">Happy Clients</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/#contact" className="interactive">
                <Button className="bg-portfolio-purple hover:bg-portfolio-purple/90 glow">
                  Contact Me
                </Button>
              </Link>
              <Button variant="outline" className="border-portfolio-purple/50 hover:border-portfolio-purple interactive">
                Download Resume
              </Button>
            </div>
          </div>

          <div ref={imageRef} className="relative">
            <div className="glass-panel p-8 space-y-6 z-10 relative">
              <h3 className="text-xl font-semibold">Fast & Optimized</h3>
              <p className="text-muted-foreground">
                Performance is not just a feature—it's a necessity. I build websites that deliver
                lightning-fast experiences to keep users engaged.
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden progress-bar-container">
                <div className="h-full bg-portfolio-purple rounded-full progress-bar" data-value="95%"></div>
              </div>

              <h3 className="text-xl font-semibold pt-2">SEO-Friendly</h3>
              <p className="text-muted-foreground">
                Websites should be found. I implement best practices to ensure your site ranks well
                in search engines and reaches your target audience.
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden progress-bar-container">
                <div className="h-full bg-portfolio-purple rounded-full progress-bar" data-value="90%"></div>
              </div>

              <h3 className="text-xl font-semibold pt-2">Modern & Responsive</h3>
              <p className="text-muted-foreground">
                With a focus on modern design principles and responsive layouts, I create websites
                that look and function beautifully on all devices.
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden progress-bar-container">
                <div className="h-full bg-portfolio-purple rounded-full progress-bar" data-value="98%"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-portfolio-purple/5 blur-xl rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
