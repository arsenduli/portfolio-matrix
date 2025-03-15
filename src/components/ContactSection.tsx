
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Github, Linkedin, Mail, MessageSquare, Send, Twitter } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const form = formRef.current;

    if (!section || !content || !form) return;

    gsap.set(content, { opacity: 0, y: 30 });
    gsap.set(form, { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'center center',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(content, { opacity: 1, y: 0, duration: 0.6 })
      .to(form, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative">
      <div className="blur-circle w-[400px] h-[400px] bg-portfolio-purple/10 bottom-0 right-0"></div>
      
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div ref={contentRef} className="space-y-6">
            <h2 className="text-gradient text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-xl text-muted-foreground">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you!
            </p>

            <div className="space-y-6 mt-8">
              <div className="flex items-start gap-4">
                <div className="bg-portfolio-purple/20 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-portfolio-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@arsenduli.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-portfolio-purple/20 p-3 rounded-full">
                  <MessageSquare className="h-6 w-6 text-portfolio-purple" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Social Media</h3>
                  <div className="flex gap-4 mt-2">
                    <a href="#" className="bg-portfolio-dark hover:bg-portfolio-dark-gray transition-colors p-2 rounded-full border border-portfolio-purple/30">
                      <Github className="h-5 w-5 text-portfolio-purple" />
                    </a>
                    <a href="#" className="bg-portfolio-dark hover:bg-portfolio-dark-gray transition-colors p-2 rounded-full border border-portfolio-purple/30">
                      <Linkedin className="h-5 w-5 text-portfolio-purple" />
                    </a>
                    <a href="#" className="bg-portfolio-dark hover:bg-portfolio-dark-gray transition-colors p-2 rounded-full border border-portfolio-purple/30">
                      <Twitter className="h-5 w-5 text-portfolio-purple" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="glass-panel p-8 space-y-6">
            <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
            
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border-portfolio-purple/20 focus:border-portfolio-purple"
                  required
                />
              </div>
              
              <div>
                <Input
                  placeholder="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-portfolio-purple/20 focus:border-portfolio-purple"
                  required
                />
              </div>
              
              <div>
                <Input
                  placeholder="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white/5 border-portfolio-purple/20 focus:border-portfolio-purple"
                  required
                />
              </div>
              
              <div>
                <Textarea
                  placeholder="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/5 border-portfolio-purple/20 focus:border-portfolio-purple min-h-[150px]"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-portfolio-purple hover:bg-portfolio-purple/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
