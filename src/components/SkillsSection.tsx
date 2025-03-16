
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, Globe, Server, Database, PenTool, Smartphone
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: string[];
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Code className="h-8 w-8 text-portfolio-purple" />,
      skills: ["HTML", "CSS", "JavaScript", "React", "Next.js", "TailwindCSS"]
    },
    {
      name: "Backend",
      icon: <Server className="h-8 w-8 text-portfolio-purple" />,
      skills: ["PHP", "Python", "Django", "Node.js", "Express"]
    },
    {
      name: "CMS & E-commerce",
      icon: <Globe className="h-8 w-8 text-portfolio-purple" />,
      skills: ["WordPress", "PrestaShop", "Magento 2", "Shopify", "WooCommerce"]
    },
    {
      name: "Database",
      icon: <Database className="h-8 w-8 text-portfolio-purple" />,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Firebase"]
    },
    {
      name: "Design & UI/UX",
      icon: <PenTool className="h-8 w-8 text-portfolio-purple" />,
      skills: ["Figma", "Adobe XD", "Responsive Design", "UI/UX Principles"]
    },
    {
      name: "Mobile & PWA",
      icon: <Smartphone className="h-8 w-8 text-portfolio-purple" />,
      skills: ["Progressive Web Apps", "React Native", "Mobile-first Design"]
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = cardsRef.current;

    if (!section || !title || !cards) return;

    gsap.set(title, { opacity: 0, y: 20 });
    gsap.set(cards.children, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.6 })
      .to(cards.children, { 
        opacity: 1, 
        y: 0, 
        duration: 0.4,
        stagger: 0.1
      }, '-=0.2');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="skills" className=" relative">
      <div className="blur-circle w-[400px] h-[400px] bg-portfolio-purple/10 top-20 right-20"></div>
      
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 ref={titleRef} className="section-title text-gradient">My Skills</h2>
          <p className="text-muted-foreground text-lg">
            With experience across various technologies and platforms, I build solutions
            that are robust, scalable, and cutting-edge.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, index) => (
            <div key={index} className="glass-panel p-6 card-hover">
              <div className="flex items-center gap-4 mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {category.skills.map((skill, idx) => (
                  <span key={idx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
