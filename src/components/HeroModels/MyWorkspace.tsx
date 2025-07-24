import * as React from 'react';
import { useRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GLTF } from 'three-stdlib';

// Define a type for the GLTF result with proper Three.js types
type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
};

// Simple screen texture hook
const useScreenTexture = (text: string, bgColor: string = '#1a1a2e', textColor: string = '#00d4ff') => {
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  
  const texture = useMemo(() => {
    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    // Clear background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add your name
    ctx.fillStyle = textColor;
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    textureRef.current = texture;
    
    return texture;
  }, [text, bgColor, textColor]);

  return texture;
};

// Use proper React Three Fiber group props type
export function Model(props: React.ComponentProps<'group'>) {
  // Use the generic GLTF type and cast with unknown first for safety
  const { nodes, materials } = useGLTF('/models/my_workspace._xyz.glb') as unknown as GLTFResult;
  
  // Create simple screen textures
  const leftScreenTexture = useScreenTexture('YOUR NAME', '#1a1a2e', '#00d4ff');
  const rightScreenTexture = useScreenTexture('PORTFOLIO', '#0a1a0a', '#00ff88');
  const tabletScreenTexture = useScreenTexture('DEVELOPER', '#1a0a1a', '#ff6b6b');
  
  // Create screen materials
  const leftScreenMaterial = useMemo(() => {
    if (!leftScreenTexture) return materials.Screen;
    return new THREE.MeshBasicMaterial({ 
      map: leftScreenTexture,
      color: '#ffffff'
    });
  }, [leftScreenTexture, materials.Screen]);
  
  const rightScreenMaterial = useMemo(() => {
    if (!rightScreenTexture) return materials.Screen;
    return new THREE.MeshBasicMaterial({ 
      map: rightScreenTexture,
      color: '#ffffff'
    });
  }, [rightScreenTexture, materials.Screen]);
  
  const tabletScreenMaterial = useMemo(() => {
    if (!tabletScreenTexture) return materials.Screen;
    return new THREE.MeshBasicMaterial({ 
      map: tabletScreenTexture,
      color: '#ffffff'
    });
  }, [tabletScreenTexture, materials.Screen]);

  // Debug: Log available nodes
  React.useEffect(() => {
    console.log('Available nodes:', Object.keys(nodes));
    console.log('Available materials:', Object.keys(materials));
  }, [nodes, materials]);

  return (
    <group {...props} dispose={null}>
      <group position={[3.263, 0.076, -2.193]} rotation={[0, 0.187, 0]} scale={0.531}>
        <mesh geometry={nodes.SpeakerLeft_Plastic_0.geometry} material={materials.Plastic} />
        <mesh geometry={nodes.SpeakerLeft_lambert1_0.geometry} material={materials.lambert1} />
      </group>
      <group position={[0.519, 0, 0.53]}>
        <mesh geometry={nodes.SpeakerRight_Plastic_0.geometry} material={materials.Plastic} />
        <mesh geometry={nodes.SpeakerRight_lambert1_0.geometry} material={materials.lambert1} />
      </group>
      <group position={[-0.994, -0.578, 0.763]} rotation={[-0.04, 0.27, 0.012]} scale={0.694}>
        <mesh geometry={nodes.Keyboard_Plastic_0.geometry} material={materials.Plastic} />
        <mesh geometry={nodes.Keyboard_Mouse1_0.geometry} material={materials.Mouse1} />
      </group>
      <group position={[3.343, 4.23, 0.43]} scale={0.115}>
        <mesh geometry={nodes.Mouse_Plastic_0.geometry} material={materials.Plastic} />
        <mesh geometry={nodes.Mouse_Mouse1_0.geometry} material={materials.Mouse1} />
      </group>
      <mesh geometry={nodes.Table1_Table_0.geometry} material={materials.Table} />
      <mesh geometry={nodes.Table2_Castors_0.geometry} material={materials.Castors} />
      <mesh geometry={nodes.Table2_Table_0.geometry} material={materials.Table} />
      <mesh geometry={nodes.Table2_Handle_0.geometry} material={materials.Handle} />
      <mesh geometry={nodes.Mat1_Mat_0.geometry} material={materials.material} />
      <mesh geometry={nodes.Mat1_Plastic_0.geometry} material={materials.Plastic} />
      <mesh geometry={nodes.Pen_Plastic_0.geometry} material={materials.Plastic} />
      <mesh geometry={nodes.Computer_Plastic_0.geometry} material={materials.Plastic} />
      <mesh geometry={nodes.Computer_Comp2_0.geometry} material={materials.Comp2} />
      <mesh geometry={nodes.LeftMonitor_Plastic_0.geometry} material={materials.Plastic} />
      {/* Left Monitor Screen with Custom Content */}
      <mesh geometry={nodes.LeftMonitor_Screen_0.geometry} material={leftScreenMaterial} />
      <mesh geometry={nodes.RightMonitor_Plastic_0.geometry} material={materials.Plastic} />
      {/* Right Monitor Screen with Custom Content */}
      <mesh geometry={nodes.RightMonitor_Screen_0.geometry} material={rightScreenMaterial} />
      <mesh geometry={nodes.Tablet_Castors_0.geometry} material={materials.Castors} />
      <mesh geometry={nodes.Tablet_Mat_0.geometry} material={materials.material} />
      <mesh geometry={nodes.Tablet_Plastic_0.geometry} material={materials.Plastic} />
      {/* Try different possible tablet screen geometries */}
      {nodes.Tablet_Screen_0 && (
        <mesh geometry={nodes.Tablet_Screen_0.geometry} material={tabletScreenMaterial} />
      )}
      {!nodes.Tablet_Screen_0 && nodes.Tablet_Mat_0 && (
        <mesh geometry={nodes.Tablet_Mat_0.geometry} material={tabletScreenMaterial} />
      )}
      <mesh 
        geometry={nodes.pCube4_lambert1_0.geometry} 
        material={materials.lambert1} 
        position={[3.926, 4.363, -2.341]} 
        scale={[0.093, 0.046, 0.192]} 
      />
      <mesh geometry={nodes.ElectricExtender_lambert1_0.geometry} material={materials.lambert1} />
      <mesh 
        geometry={nodes.SpeakersCable_Cable_0.geometry} 
        material={materials.Cable} 
        position={[-1.638, 4.319, -1.46]} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={0.018} 
      />
      <mesh geometry={nodes.SecondMonitorCable_Cable_0.geometry} material={materials.Cable} />
      <mesh geometry={nodes.MainMonitorCable_Cable_0.geometry} material={materials.Cable} />
      <mesh geometry={nodes.MouseCable_Cable_0.geometry} material={materials.Cable} />
      <mesh 
        geometry={nodes.pCube5_Wood_0.geometry} 
        material={materials.Wood} 
        position={[0, -0.111, 0]} 
        scale={[22.353, 0.175, 14.32]} 
      />
    </group>
  );
}

useGLTF.preload('/models/my_workspace._xyz.glb');