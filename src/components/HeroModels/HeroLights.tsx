import React from 'react';

export const HeroLightsSimple: React.FC = () => {
  return (
    <>
      {/* Strong ambient light for overall visibility */}
      <ambientLight intensity={0.6} color="#ffffff" />
      
      {/* Main directional light from top */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />
      
      {/* Secondary light from the side */}
      <directionalLight
        position={[-3, 5, 3]}
        intensity={0.8}
        color="#e6f0ff"
      />
      
      {/* Point light for close-up detail */}
      <pointLight
        position={[2, 4, 4]}
        intensity={1}
        color="#ffffff"
        distance={15}
      />
    </>
  );
};

export default HeroLightsSimple;