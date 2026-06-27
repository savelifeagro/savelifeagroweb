import React, { useRef, useState, useEffect } from 'react';

export default function Magnet({ children, padding = 150, strength = 4, className = '' }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e) => {
      if (!ref.current) return;
      
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
      
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const maxDistance = Math.max(width, height) / 2 + padding;
      
      if (distance < maxDistance) {
        setIsHovered(true);
        setPosition({
          x: distanceX / strength,
          y: distanceY / strength
        });
      } else {
        setIsHovered(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleEnd = () => {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: true });
    window.addEventListener('touchend', handleEnd);
    
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [padding, strength]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-in-out',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
