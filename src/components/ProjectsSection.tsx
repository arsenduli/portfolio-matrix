
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveBorder } from './ui/moving-border';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl?: string;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: "E-commerce Platform",
      description: "A high-performance e-commerce platform built with Magento 2, featuring optimized checkout flow and SEO improvements that increased conversion rates by 35%.",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=E-commerce+Platform",
      technologies: ["Magento 2", "PHP", "JavaScript", "MySQL", "Redis"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Real Estate Portal",
      description: "A modern real estate website with advanced search capabilities, map integration, and a responsive design, built with WordPress and custom plugins.",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=Real+Estate+Portal",
      technologies: ["WordPress", "PHP", "JavaScript", "Google Maps API"],
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      title: "Blog & Content Platform",
      description: "A fast-loading, SEO-optimized content platform built with Next.js and a headless CMS, achieving a 98/100 PageSpeed score and best seo what the website what have.",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=Blog+Platform",
      technologies: ["Next.js", "React", "TailwindCSS", "Headless CMS"],
      demoUrl: "#",
      githubUrl: "#"
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const projectCards = projectsRef.current;

    if (!section || !title || !projectCards) return;

    gsap.set(title, { opacity: 0, y: 20 });
    gsap.set(projectCards.children, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.6 })
      .to(projectCards.children, { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        stagger: 0.2
      }, '-=0.3');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className=" relative">
      
      <div className="blur-circle w-[350px] h-[350px] bg-portfolio-purple/15 bottom-0 left-20"></div>
      
      <div className="section-container">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-gradient">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">
            A selection of my recent work showcasing my expertise in building fast,
            SEO-optimized, and user-friendly websites.
          </p>
        </div>

        <div ref={projectsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <MoveBorder key={index} >
              <div className="relative h-48 overflow-hidden w-full rounded-[29px_29px_0px_0px]">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-left">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="skill-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="flex items-center gap-2 border-portfolio-purple/50 hover:border-portfolio-purple">
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Demo</span>
                  </Button>
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" className="flex items-center gap-2 border-portfolio-purple/50 hover:border-portfolio-purple">
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </MoveBorder>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-portfolio-purple hover:bg-portfolio-purple/90">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
