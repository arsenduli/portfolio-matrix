import { memo } from 'react';
import { AnimatedTestimonials } from "./ui/animated-testimonials";

// Memoize the testimonials data to prevent unnecessary re-creation
const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=800&auto=format&fit=crop",
  },
];

export const AnimatedTestimonialsDemo = memo(() => {
  return (
    <section className="relative">
      <div className="blur-circle w-[350px] h-[350px] bg-portfolio-purple/15 bottom-0 left-20" />
      <div className="section-container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-gradient">What My Clients Say</h2>
          <p className="text-muted-foreground text-lg">
            See what my clients say about my fast, SEO-optimized, and user-friendly websites.
          </p>
        </div>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
});
