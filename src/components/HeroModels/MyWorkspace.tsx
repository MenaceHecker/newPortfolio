import * as React from 'react';
import { useRef, useMemo, useState, useEffect } from 'react';
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

// Enhanced screen texture hook for creating realistic screen content
const useScreenTexture = (screenType: 'vscode' | 'github' | 'text', textContent?: string) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    if (screenType === 'vscode') {
      // VS Code dark theme
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Top bar
      ctx.fillStyle = '#2d2d30';
      ctx.fillRect(0, 0, canvas.width, 30);
      
      // Sidebar
      ctx.fillStyle = '#252526';
      ctx.fillRect(0, 30, 60, canvas.height - 30);
      
      // Code area
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(60, 30, canvas.width - 60, canvas.height - 30);
      
      // Add some code-like text
      ctx.fillStyle = '#d4d4d4';
      ctx.font = '8px Monaco, monospace';
      ctx.textAlign = 'left';
      
      const codeLines = [
        'import React from "react";',
        'import { useState } from "react";',
        '',
        'function App() {',
        '  const [count, setCount] = useState(0);',
        '',
        '  return (',
        '    <div className="App">',
        '      <h1>Tushar\'s Projects</h1>',
        '      <button onClick={() => setCount(c => c + 1)}>',
        '        Count: {count}',
        '      </button>',
        '    </div>',
        '  );',
        '}',
        'export default App;',
      ];
      
      codeLines.forEach((line, i) => {
        if (line.includes('import') || line.includes('from')) {
          ctx.fillStyle = '#c586c0';
        } else if (line.includes('function') || line.includes('const') || line.includes('return')) {
          ctx.fillStyle = '#569cd6';
        } else if (line.includes('React') || line.includes('useState')) {
          ctx.fillStyle = '#4ec9b0';
        } else if (line.includes('"') || line.includes("'")) {
          ctx.fillStyle = '#ce9178';
        } else {
          ctx.fillStyle = '#d4d4d4';
        }
        ctx.fillText(line, 70, 50 + i * 12);
      });
      
    } else if (screenType === 'github') {
      // GitHub dark theme
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Header
      ctx.fillStyle = '#21262d';
      ctx.fillRect(0, 0, canvas.width, 50);
      
      // Profile section
      ctx.fillStyle = '#161b22';
      ctx.fillRect(10, 60, canvas.width - 20, 140);
      
      // Profile picture placeholder (circle)
      ctx.fillStyle = '#30363d';
      ctx.beginPath();
      ctx.arc(50, 110, 20, 0, 2 * Math.PI);
      ctx.fill();
      
      // Add GitHub-like text
      ctx.fillStyle = '#f0f6fc';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('Tushar Mishra', 80, 105);
      
      ctx.fillStyle = '#8b949e';
      ctx.font = '8px Arial';
      ctx.fillText('MenaceHecker', 80, 120);
      ctx.fillText('CS @uga \'25 | Ex SWE Intern @crst', 20, 140);
      ctx.fillText('Full-stack & Cloud Dev | AI + DevOps', 20, 155);
      ctx.fillText('Building scalable, data-driven apps', 20, 170);
      
      // Repository list
      ctx.fillStyle = '#f0f6fc';
      ctx.font = '8px Arial';
      const repos = [
        '📁 SocialMedia-Crumb',
        '📁 AI-Projects', 
        '📁 React-Portfolio',
        '📁 Three.js-Demos',
        '📁 Spring-Boot-Apps',
        '📁 AWS-DevOps'
      ];
      repos.forEach((repo, i) => {
        ctx.fillText(repo, 20, 220 + i * 20);
      });
      
      // Stats
      ctx.fillStyle = '#58a6ff';
      ctx.font = '7px Arial';
      ctx.fillText('⭐ 23 repositories • 👥 2 followers • 1 following', 20, 380);
      ctx.fillText('📍 Athens, GA • 🕐 19:37 (UTC -04:00)', 20, 395);
      
    } else {
      // Simple text fallback
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(textContent || 'SCREEN', canvas.width / 2, canvas.height / 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, [screenType, textContent]);

  return texture;
};

// Hook to load images
const useImageLoader = (src: string) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Handle CORS if needed
    img.onload = () => {
      setImage(img);
      setLoaded(true);
    };
    img.onerror = () => {
      console.error(`Failed to load image: ${src}`);
      setLoaded(true);
    };
    img.src = src;
  }, [src]);

  return { image, loaded };
};

// Use proper React Three Fiber group props type
export function Model(props: React.ComponentProps<'group'>) {
  // Use the generic GLTF type and cast with unknown first for safety
  const { nodes, materials } = useGLTF('/models/my_workspace._xyz.glb') as unknown as GLTFResult;
  
  // Create realistic screen textures
  const leftScreenTexture = useScreenTexture('vscode');
  const rightScreenTexture = useScreenTexture('github');
  const tabletScreenTexture = useScreenTexture('text', 'DEVELOPER');
  
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
      {/* Left Monitor Screen with VS Code Screenshot */}
      <mesh geometry={nodes.LeftMonitor_Screen_0.geometry} material={leftScreenMaterial} />
      <mesh geometry={nodes.RightMonitor_Plastic_0.geometry} material={materials.Plastic} />
      {/* Right Monitor Screen with GitHub Profile */}
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