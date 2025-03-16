
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveBorder } from './ui/moving-border';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
  slug: string;
}

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const postsRef = useRef<HTMLDivElement>(null);

  const blogPosts: BlogPost[] = [
    {
      title: "Optimizing WordPress Performance: A Complete Guide",
      excerpt: "Learn how to make your WordPress website lightning fast with these proven optimization techniques.",
      date: "June 15, 2025",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=WordPress+Performance",
      category: "WordPress",
      slug: "optimizing-wordpress-performance"
    },
    {
      title: "Next.js vs. Traditional WordPress: Which to Choose?",
      excerpt: "A detailed comparison of headless WordPress with Next.js versus traditional WordPress setups.",
      date: "May 28, 2025",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=Next.js+vs+WordPress",
      category: "Web Development",
      slug: "nextjs-vs-traditional-wordpress"
    },
    {
      title: "SEO Best Practices for E-commerce in 2025",
      excerpt: "Stay ahead of the competition with these cutting-edge SEO strategies for online stores.",
      date: "April 10, 2025",
      image: "https://placehold.co/600x400/0A0F1C/9b87f5?text=E-commerce+SEO",
      category: "SEO",
      slug: "seo-best-practices-ecommerce-2025"
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const posts = postsRef.current;

    if (!section || !title || !posts) return;

    gsap.set(title, { opacity: 0, y: 20 });
    gsap.set(posts.children, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(title, { opacity: 1, y: 0, duration: 0.6 })
      .to(posts.children, { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.15
      }, '-=0.3');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="blog" className=" relative">
      <div className="blur-circle w-[300px] h-[300px] bg-portfolio-purple/10 top-20 left-20"></div>
      
      <div className="section-container">
        <div ref={titleRef} className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-gradient">Blog & Insights</h2>
          <p className="text-muted-foreground text-lg">
            Sharing knowledge and insights about web development, SEO, and best practices
            for building modern websites.
          </p>
        </div>

        <div ref={postsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <MoveBorder key={index}>
              <div className="relative h-48 overflow-hidden w-full rounded-[29px_29px_0px_0px]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-portfolio-purple/90 text-white text-xs px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <CardContent className="p-6 text-left">
                <div className="text-muted-foreground text-sm mb-2">{post.date}</div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{post.excerpt}</p>
                
                <Link to={`/blog/${post.slug}`} className="text-portfolio-purple hover:text-portfolio-light-purple inline-flex items-center gap-1 font-medium">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </MoveBorder>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="bg-portfolio-purple hover:bg-portfolio-purple/90">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
