
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-gradient">
              Arsen<span className="text-white">.</span>
            </Link>
            <p className="text-muted-foreground mt-2 max-w-md">
              Building high-performance, modern websites that redefine digital experiences.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/#about" className="nav-link">
                About
              </Link>
              <Link to="/#skills" className="nav-link">
                Skills
              </Link>
              <Link to="/#projects" className="nav-link">
                Projects
              </Link>
              <Link to="/#blog" className="nav-link">
                Blog
              </Link>
              <Link to="/#contact" className="nav-link">
                Contact
              </Link>
            </nav>

            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="p-2 rounded-full bg-portfolio-dark-gray/30 hover:bg-portfolio-dark-gray transition-colors">
                <Github className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a href="#" className="p-2 rounded-full bg-portfolio-dark-gray/30 hover:bg-portfolio-dark-gray transition-colors">
                <Linkedin className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a href="#" className="p-2 rounded-full bg-portfolio-dark-gray/30 hover:bg-portfolio-dark-gray transition-colors">
                <Twitter className="h-5 w-5 text-portfolio-purple" />
              </a>
              <a href="mailto:contact@arsenduli.com" className="p-2 rounded-full bg-portfolio-dark-gray/30 hover:bg-portfolio-dark-gray transition-colors">
                <Mail className="h-5 w-5 text-portfolio-purple" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {currentYear} Arsen Duli. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
