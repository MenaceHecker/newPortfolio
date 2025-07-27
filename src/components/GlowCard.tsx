import React, { useRef } from 'react';

type ExpCardType = {
  review: string;
  imgPath: string;
  title: string;
  date: string;
  responsibilities: string[];
};

type GlowCardProps = {
  card: ExpCardType;
  index: number;
  children: React.ReactNode;
};

const GlowCard: React.FC<GlowCardProps> = ({ card, index, children }) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (index: number) => (e: React.MouseEvent) => {
    const currentCard = cardRefs.current[index];
    if (!currentCard) return;

    const rect = currentCard.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    currentCard.style.setProperty('--start', `${angle + 60}deg`);
  };

  return (
    <div
  ref={(el) => {
    cardRefs.current[index] = el;
  }}
  onMouseMove={handleMouseMove(index)}
  className="card card-border timeline-card rounded-xl p-10"
>

      <div className="glow" />
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <img src="/images/star.png" key={i} alt="star" className="star" />
        ))}
      </div>
      <div className="mb-5">
        <p className="text-white-50 text-lg">{card.review}</p>
      </div>
      {children}
    </div>
  );
};

export default GlowCard;
