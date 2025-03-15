
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

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    gsap.set(content, { opacity: 0, x: -50 });
    gsap.set(image, { opacity: 0, x: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(content, { opacity: 1, x: 0, duration: 0.8 })
      .to(image, { opacity: 1, x: 0, duration: 0.8 }, '-=0.6');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative">
      <div className="blur-circle w-[400px] h-[400px] bg-portfolio-purple/10 -bottom-20 -left-20"></div>

      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-gradient text-3xl md:text-4xl font-bold">About Me</h2>
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
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/#contact">
                <Button className="bg-portfolio-purple hover:bg-portfolio-purple/90">
                  Contact Me
                </Button>
              </Link>
              <Button variant="outline" className="border-portfolio-purple/50 hover:border-portfolio-purple">
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
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-portfolio-purple w-[95%] rounded-full"></div>
              </div>

              <h3 className="text-xl font-semibold pt-2">SEO-Friendly</h3>
              <p className="text-muted-foreground">
                Websites should be found. I implement best practices to ensure your site ranks well
                in search engines and reaches your target audience.
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-portfolio-purple w-[90%] rounded-full"></div>
              </div>

              <h3 className="text-xl font-semibold pt-2">Modern & Responsive</h3>
              <p className="text-muted-foreground">
                With a focus on modern design principles and responsive layouts, I create websites
                that look and function beautifully on all devices.
              </p>
              <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-portfolio-purple w-[98%] rounded-full"></div>
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
