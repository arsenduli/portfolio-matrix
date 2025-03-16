
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 z-[1050] ${
        isScrolled ? 'py-3 bg-portfolio-dark/80 backdrop-blur-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gradient">
          <img className='w-[220px]' src='/logo_duli.png'/>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="#about" className="nav-link">
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
          <Button size="sm" className="bg-portfolio-purple hover:bg-portfolio-purple/90">
            Resume
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[5rem] left-0 w-full h-[calc(100vh-4rem)] bg-portfolio-dark/95 backdrop-blur-md p-6 flex flex-col space-y-6 animate-fade-in">
          <Link
            to="/#about"
            className="text-xl py-2 border-b border-gray-800"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            to="/#skills"
            className="text-xl py-2 border-b border-gray-800"
            onClick={toggleMobileMenu}
          >
            Skills
          </Link>
          <Link
            to="/#projects"
            className="text-xl py-2 border-b border-gray-800"
            onClick={toggleMobileMenu}
          >
            Projects
          </Link>
          <Link
            to="/#blog"
            className="text-xl py-2 border-b border-gray-800"
            onClick={toggleMobileMenu}
          >
            Blog
          </Link>
          <Link
            to="/#contact"
            className="text-xl py-2 border-b border-gray-800"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
          <Button className="w-full mt-4 bg-portfolio-purple hover:bg-portfolio-purple/90">
            Resume
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
