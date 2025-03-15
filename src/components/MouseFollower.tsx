
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    // Create GSAP animation for cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorFollower, { xPercent: -50, yPercent: -50 });
    
    // Add event listeners
    window.addEventListener('mousemove', (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      gsap.to(cursor, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY
      });
      
      gsap.to(cursorFollower, {
        duration: 0.5,
        x: e.clientX,
        y: e.clientY
      });
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        setIsHovering(true);
        document.body.classList.add('cursor-hover');
      });
      
      el.addEventListener('mouseleave', () => {
        setIsHovering(false);
        document.body.classList.remove('cursor-hover');
      });
    });
    
    // Cleanup
    return () => {
      document.body.removeChild(cursor);
      document.body.removeChild(cursorFollower);
      window.removeEventListener('mousemove', () => {});
    };
  }, []);
  
  return null;  // This component doesn't render anything visually
};

export default MouseFollower;
