import React, { useRef, useState } from 'react';

type ExpCardType = {
  review: string;
  imgPath: string;
  title: string;
  date: string;
  responsibilities: string[];
};

type GlowCardProps = {
  card?: ExpCardType;
  index?: number;
  children?: React.ReactNode;
};

const GlowCard: React.FC<GlowCardProps> = ({ card, index, children }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mouseAngle, setMouseAngle] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const currentCard = cardRef.current;
    if (!currentCard) return;

    const rect = currentCard.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    setMouseAngle(angle + 60);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-xl p-10 transition-all duration-300 ease-in-out overflow-hidden backdrop-blur-sm bg-black/30"
      style={{
        border: '2px solid transparent',
        background: isHovered 
          ? `conic-gradient(from ${mouseAngle}deg, transparent, rgba(255, 255, 255, 0.2), rgba(0, 255, 255, 0.3), transparent), rgba(0, 0, 0, 0.3)`
          : 'rgba(0, 0, 0, 0.3)',
        backgroundClip: 'padding-box',
      }}
    >
      {/* Animated border overlay */}
      <div 
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `conic-gradient(from ${mouseAngle}deg, transparent, rgba(255, 255, 255, 0.4), rgba(0, 255, 255, 0.5), transparent)`,
          padding: '2px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          zIndex: -1,
        }}
      />

      {/* Glow effect */}
      <div 
        className={`absolute top-1/2 left-1/2 w-48 h-48 rounded-full transition-opacity duration-300 ease-in-out pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: 'radial-gradient(circle, rgba(0, 255, 255, 0.15) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center gap-1 mb-5">
          {Array.from({ length: 5 }, (_, i) => (
            <img src="/images/star.png" key={i} alt="star" className="w-4 h-4" />
          ))}
        </div>
        <div className="mb-5">
          <p className="text-white/80 text-lg">{card?.review || 'Sample review text'}</p>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GlowCard;