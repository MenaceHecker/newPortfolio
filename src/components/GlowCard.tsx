// const GlowCard = ({card, children}) => {
//   return (
//     <div className="card card-border timeline-card rounded-xl p-10">
//         <div className="glow" />
//             <div className="flex items-center gap-1 mb-5">
//                 {Array.from({length: 5}, (_, i) => (
//                     <img src="/images/star.png" key ={i} alt="star" className="star" />
//                 ))}
//             </div>
//             <div className="mb-5">
//                 <p className="text-white-50 text-lg">{card.review}</p>
//             </div>
//             {children}
//         </div>
//   )
// }

// export default GlowCard

import React from 'react';

type ExpCardType = {
  review: string;
};

type GlowCardProps = {
  card: ExpCardType;
  children: React.ReactNode;
};

const GlowCard: React.FC<GlowCardProps> = ({ card, children }) => {
  return (
    <div className="card card-border timeline-card rounded-xl p-10">
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
