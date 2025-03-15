
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    // Create cursor elements
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.classList.add('cursor-follower');
    document.body.appendChild(cursorFollower);
    
    // Create cursor dot for precise interactions
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);
    
    // Create GSAP animation for cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorFollower, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    
    // Magnetic effect variables
    let magneticElements = document.querySelectorAll('.magnetic');
    const magnetStrength = 0.5;
    
    // Add event listeners
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Main cursor (moves instantly)
      gsap.to(cursorDot, {
        duration: 0.1,
        x: e.clientX,
        y: e.clientY
      });
      
      // Follower cursor (moves with delay for trailing effect)
      gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY
      });
      
      // Outer follower (more delay for layered effect)
      gsap.to(cursorFollower, {
        duration: 0.8,
        x: e.clientX,
        y: e.clientY
      });
      
      // Magnetic effect for interactive elements
      magneticElements.forEach((magnetEl) => {
        const element = magnetEl as HTMLElement;
        if (!element) return;
        
        const boundingRect = element.getBoundingClientRect();
        const centerX = boundingRect.left + boundingRect.width / 2;
        const centerY = boundingRect.top + boundingRect.height / 2;
        
        // Calculate distance between cursor and element center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Check if cursor is close to the element
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const magnetThreshold = 150; // Adjust based on when you want the effect to start
        
        if (distance < magnetThreshold) {
          // Apply magnetic effect - move element slightly towards cursor
          gsap.to(element, {
            duration: 0.3,
            x: distanceX * magnetStrength,
            y: distanceY * magnetStrength,
            ease: "power3.out"
          });
        } else {
          // Reset position when cursor is far away
          gsap.to(element, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: "power3.out"
          });
        }
      });
    };
    
    const onMouseDown = () => {
      setIsClicking(true);
      document.body.classList.add('cursor-clicking');
    };
    
    const onMouseUp = () => {
      setIsClicking(false);
      document.body.classList.remove('cursor-clicking');
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
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
    
    // Add special effects for different element types
    const textElements = document.querySelectorAll('h1, h2, h3, p, .text-effect');
    
    textElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-text');
      });
      
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-text');
      });
    });
    
    // Apply special effect for images
    const imageElements = document.querySelectorAll('img, .image-effect');
    
    imageElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-image');
      });
      
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-image');
      });
    });
    
    // Refresh magnetic elements when the DOM changes
    const refreshMagneticElements = () => {
      magneticElements = document.querySelectorAll('.magnetic');
    };
    
    // Set up a MutationObserver to detect DOM changes
    const observer = new MutationObserver(refreshMagneticElements);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Add CSS styles for cursor effects
    const style = document.createElement('style');
    style.innerHTML = `
      body {
        cursor: none !important;
      }
      
      /* Add cursor-related styles here if needed */
    `;
    document.head.appendChild(style);
    
    // Cleanup
    return () => {
      document.body.removeChild(cursor);
      document.body.removeChild(cursorFollower);
      document.body.removeChild(cursorDot);
      document.head.removeChild(style);
      
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      
      observer.disconnect();
    };
  }, []);
  
  // Add this to App.css or index.css to style the cursor
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(155, 135, 245, 0.5);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
      }
      
      .cursor-follower {
        position: fixed;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid rgba(155, 135, 245, 0.3);
        pointer-events: none;
        z-index: 9998;
        mix-blend-mode: difference;
      }
      
      .cursor-dot {
        position: fixed;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.8);
        pointer-events: none;
        z-index: 10000;
        box-shadow: 0 0 10px rgba(155, 135, 245, 0.8);
      }
      
      /* Hover Effects */
      .cursor-hover .cursor {
        transform: scale(1.5);
        background-color: rgba(155, 135, 245, 0.8);
      }
      
      .cursor-hover .cursor-follower {
        transform: scale(0.8);
        opacity: 0.5;
      }
      
      /* Click Effects */
      .cursor-clicking .cursor {
        transform: scale(0.8);
        background-color: rgba(255, 255, 255, 0.8);
      }
      
      .cursor-clicking .cursor-follower {
        transform: scale(1.2);
      }
      
      /* Text Effects */
      .cursor-text .cursor {
        width: 3px;
        height: 25px;
        border-radius: 0;
        background-color: rgba(255, 255, 255, 0.8);
      }
      
      .cursor-text .cursor-follower {
        opacity: 0;
      }
      
      /* Image Effects */
      .cursor-image .cursor {
        background-color: transparent;
        border: 1px solid white;
        width: 40px;
        height: 40px;
      }
      
      .cursor-image .cursor-follower {
        opacity: 0;
      }
      
      /* Add magnetic class to elements you want to have the magnetic effect */
      .magnetic {
        transition: transform 0.3s ease;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;  // This component doesn't render anything visually
};

export default MouseFollower;
