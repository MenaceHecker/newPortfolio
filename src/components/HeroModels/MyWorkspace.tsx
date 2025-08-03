import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
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

const useImageTexture = (imagePath: string) => {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(
      imagePath,
      (loadedTexture) => {
        const canvas = document.createElement('canvas');
        // Use monitor aspect ratio (typically 16:9 or 16:10)
        canvas.width = 1920;
        canvas.height = 1080;
        
        const ctx = canvas.getContext('2d');
        if (ctx && loadedTexture.image) {
          const img = loadedTexture.image;
          
          // Fill with black background first
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          // Get actual image dimensions
          const imgWidth = img.naturalWidth || img.width;
          const imgHeight = img.naturalHeight || img.height;
          const imgAspect = imgWidth / imgHeight;
          const canvasAspect = canvas.width / canvas.height;
          
          let drawWidth, drawHeight, offsetX, offsetY;
          
          // Scale factor to control how much of the canvas the image fills
          const SCALE_FACTOR = 1.0; // Fill the entire monitor
          
          // Scale to fit within the canvas while maintaining aspect ratio
          if (imgAspect > canvasAspect) {
            // Image is wider - fit to width with scale factor
            drawWidth = canvas.width * SCALE_FACTOR;
            drawHeight = drawWidth / imgAspect;
          } else {
            // Image is taller - fit to height with scale factor
            drawHeight = canvas.height * SCALE_FACTOR;
            drawWidth = drawHeight * imgAspect;
          }
          
          // Position the image slightly to the left to show more content
          offsetX = (canvas.width - drawWidth) / 2 - (canvas.width * 0.035); // Shift left by 5% (reduced from 10%)
          offsetY = (canvas.height - drawHeight) / 2;
          
          // Draw the image
          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          
          // Create texture from canvas
          const canvasTexture = new THREE.CanvasTexture(canvas);
          canvasTexture.generateMipmaps = false;
          canvasTexture.minFilter = THREE.LinearFilter;
          canvasTexture.magFilter = THREE.LinearFilter;
          canvasTexture.wrapS = THREE.ClampToEdgeWrapping;
          canvasTexture.wrapT = THREE.ClampToEdgeWrapping;
          canvasTexture.flipY = true; // Flip texture for proper orientation
          canvasTexture.needsUpdate = true;
          
          setTexture(canvasTexture);
        } else {
          // Fallback to original texture if canvas processing fails
          loadedTexture.generateMipmaps = false;
          loadedTexture.minFilter = THREE.LinearFilter;
          loadedTexture.magFilter = THREE.LinearFilter;
          loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
          loadedTexture.wrapT = THREE.ClampToEdgeWrapping;
          loadedTexture.flipY = true; // Flip texture for proper orientation
          loadedTexture.needsUpdate = true;
          setTexture(loadedTexture);
        }
        
        setLoaded(true);
      },
      undefined,
      (error) => {
        console.error(`Failed to load image: ${imagePath}`, error);
        setLoaded(true);
      }
    );
  }, [imagePath]);

  return { texture, loaded };
};

const useScreenTexture = (screenType: 'vscode' | 'github' | 'text' | 'image', textContent?: string, imageTexture?: THREE.Texture | null) => {
  const texture = useMemo(() => {
    // If we have an image texture, use it directly
    if (screenType === 'image' && imageTexture) {
      return imageTexture;
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    if (screenType === 'vscode') {
      // VS Code dark theme - more accurate recreation
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Top bar
      ctx.fillStyle = '#2d2d30';
      ctx.fillRect(0, 0, canvas.width, 60);
      
      // Sidebar
      ctx.fillStyle = '#252526';
      ctx.fillRect(0, 60, 120, canvas.height - 60);
      
      // Code area
      ctx.fillStyle = '#1e1e1e';
      ctx.fillRect(120, 60, canvas.width - 120, canvas.height - 60);
      
      // Terminal area at bottom
      ctx.fillStyle = '#181818';
      ctx.fillRect(120, canvas.height - 200, canvas.width - 120, 200);
      
      // Add VS Code title bar buttons
      ctx.fillStyle = '#ff5f57';
      ctx.beginPath();
      ctx.arc(20, 30, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(50, 30, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.fillStyle = '#28ca42';
      ctx.beginPath();
      ctx.arc(80, 30, 8, 0, 2 * Math.PI);
      ctx.fill();
      
      // File explorer items
      ctx.fillStyle = '#cccccc';
      ctx.font = '14px "SF Mono", Monaco, monospace';
      ctx.textAlign = 'left';
      
      const explorerItems = [
        '🗂 CRUMB',
        '  📁 .expo',
        '  📁 .vscode', 
        '  📁 android',
        '  📁 app',
        '    📄 _layout.jsx',
        '    📄 editProfile.jsx',
        '    📄 home.jsx',
        '    📄 index.jsx',
        '  📁 assets',
        '  📁 components'
      ];
      
      explorerItems.forEach((item, i) => {
        ctx.fillText(item, 10, 100 + i * 24);
      });
      
      // Code content - React/JavaScript
      ctx.font = '16px "SF Mono", Monaco, monospace';
      const codeLines = [
        'import { Slot, Stack, useRouter } from "expo-router";',
        'import { useEffect } from "react";', 
        'import { AuthProvider, useAuth } from "../contexts/AuthContext";',
        'import { supabase } from "../lib/supabase";',
        '',
        'const RootLayout = () => {',
        '  return (',
        '    <AuthProvider>',
        '      <MainLayout />',
        '    </AuthProvider>',
        '  );',
        '};',
        '',
        'const MainLayout = () => {',
        '  const { setAuth, setUserData } = useAuth();',
        '  const router = useRouter();',
        '',
        '  useEffect(() => {',
        '    console.log("Registering Supabase Auth Listener...");',
        '  }, []);',
        '',
        '  const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {'
      ];
      
      codeLines.forEach((line, i) => {
        let color = '#d4d4d4';
        
        if (line.includes('import') || line.includes('from') || line.includes('export')) {
          color = '#c586c0';
        } else if (line.includes('const') || line.includes('return') || line.includes('useEffect')) {
          color = '#569cd6';
        } else if (line.includes('AuthProvider') || line.includes('useAuth') || line.includes('supabase')) {
          color = '#4ec9b0';
        } else if (line.includes('"') || line.includes("'")) {
          color = '#ce9178';
        } else if (line.includes('//')) {
          color = '#6a9955';
        }
        
        ctx.fillStyle = color;
        ctx.fillText(line, 140, 120 + i * 22);
      });
      
      // Terminal content
      ctx.fillStyle = '#cccccc';
      ctx.font = '14px "SF Mono", Monaco, monospace';
      ctx.fillText('PS C:\\Users\\thedy\\OneDrive\\Desktop\\SocialMedia\\Crumb>', 140, canvas.height - 160);
      
    } else if (screenType === 'github') {
      // GitHub profile - more accurate recreation
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // GitHub header
      ctx.fillStyle = '#21262d';
      ctx.fillRect(0, 0, canvas.width, 80);
      
      // GitHub logo area
      ctx.fillStyle = '#f0f6fc';
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'left';
      ctx.fillText('🐙 GitHub', 40, 50);
      
      // Search bar
      ctx.fillStyle = '#21262d';
      ctx.fillRect(300, 25, 400, 30);
      ctx.strokeStyle = '#30363d';
      ctx.lineWidth = 1;
      ctx.strokeRect(300, 25, 400, 30);
      
      // Profile section
      ctx.fillStyle = '#161b22';
      ctx.fillRect(40, 120, 320, 300);
      
      // Profile picture (Spider-Man placeholder)
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath();
      ctx.arc(80, 180, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      // Profile info
      ctx.fillStyle = '#f0f6fc';
      ctx.font = 'bold 28px Arial';
      ctx.fillText('Tushar Mishra', 130, 170);
      
      ctx.fillStyle = '#8b949e';
      ctx.font = '18px Arial';
      ctx.fillText('MenaceHecker', 130, 195);
      
      // Bio
      ctx.fillStyle = '#f0f6fc';
      ctx.font = '16px Arial';
      ctx.fillText('💻 CS @uga \'25 | Ex SWE Intern @crst', 50, 240);
      ctx.fillText('🚀 Full-stack & Cloud Dev | AI + DevOps', 50, 265);
      ctx.fillText('🔨 Building scalable, data-driven apps', 50, 290);
      
      // Stats
      ctx.fillStyle = '#8b949e';
      ctx.font = '14px Arial';
      ctx.fillText('👥 2 followers • 1 following', 50, 320);
      ctx.fillText('📍 Athens, GA • 🕐 19:37 (UTC -04:00)', 50, 340);
      ctx.fillText('🔗 https://www.menacehecker.com/', 50, 360);
      
      // README section
      ctx.fillStyle = '#f0f6fc';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('👋 Hey there! I\'m Tushar', 400, 160);
      
      // Tech stack badges
      const badges = [
        { text: 'JAVA', color: '#f89820' },
        { text: 'PYTHON', color: '#3776ab' },
        { text: 'JAVASCRIPT', color: '#f7df1e' },
        { text: 'REACT', color: '#61dafb' },
        { text: 'NEXT.JS', color: '#000000' },
        { text: 'NODE.JS', color: '#339933' },
        { text: 'SPRING BOOT', color: '#6db33f' },
        { text: 'AWS', color: '#ff9900' },
        { text: 'DOCKER', color: '#2496ed' }
      ];
      
      badges.forEach((badge, i) => {
        const x = 400 + (i % 3) * 150;
        const y = 200 + Math.floor(i / 3) * 40;
        
        ctx.fillStyle = badge.color;
        ctx.fillRect(x, y, 120, 25);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(badge.text, x + 60, y + 17);
        ctx.textAlign = 'left';
      });
      
    } else {
      // Simple text fallback
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00d4ff';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(textContent || 'SCREEN', canvas.width / 2, canvas.height / 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.flipY = true; // Flip texture for proper orientation
    texture.needsUpdate = true;
    return texture;
  }, [screenType, textContent, imageTexture]);

  return texture;
};

// Use proper React Three Fiber group props type
export function Model(props: React.ComponentProps<'group'>) {
  // Use the generic GLTF type and cast with unknown first for safety
  const { nodes, materials } = useGLTF('/models/my_workspace._xyz.glb') as unknown as GLTFResult;
  
  // Load both real images - try different possible paths
  const { texture: githubTexture, loaded: githubLoaded } = useImageTexture('/images/github-profile.png');
  const { texture: vscodeTexture, loaded: vscodeLoaded } = useImageTexture('/images/vsc-ss.png');
  
  // Create screen textures - prioritize real images when loaded
  const leftScreenTexture = useScreenTexture(
    vscodeLoaded && vscodeTexture ? 'image' : 'vscode',
    undefined,
    vscodeTexture
  );
  const rightScreenTexture = useScreenTexture(
    githubLoaded && githubTexture ? 'image' : 'github',
    undefined,
    githubTexture
  );
  const tabletScreenTexture = useScreenTexture('text', 'DEVELOPER');
  
  // Create screen materials with optimized settings
  const leftScreenMaterial = useMemo(() => {
    if (!leftScreenTexture) return materials.Screen;
    const material = new THREE.MeshBasicMaterial({ 
      map: leftScreenTexture,
      color: '#ffffff',
      transparent: false,
      side: THREE.FrontSide,
      toneMapped: false // Prevents color shifts
    });
    return material;
  }, [leftScreenTexture, materials.Screen]);
  
  const rightScreenMaterial = useMemo(() => {
    if (!rightScreenTexture) return materials.Screen;
    const material = new THREE.MeshBasicMaterial({ 
      map: rightScreenTexture,
      color: '#ffffff',
      transparent: false,
      side: THREE.FrontSide,
      toneMapped: false // Prevents color shifts
    });
    return material;
  }, [rightScreenTexture, materials.Screen]);
  
  const tabletScreenMaterial = useMemo(() => {
    if (!tabletScreenTexture) return materials.Screen;
    return new THREE.MeshBasicMaterial({ 
      map: tabletScreenTexture,
      color: '#ffffff',
      toneMapped: false
    });
  }, [tabletScreenTexture, materials.Screen]);

  // Debug: Log available nodes and loading status
  React.useEffect(() => {
    console.log('Available nodes:', Object.keys(nodes));
    console.log('Available materials:', Object.keys(materials));
    console.log('GitHub image loaded:', githubLoaded, githubTexture ? 'texture created' : 'no texture');
    console.log('VS Code image loaded:', vscodeLoaded, vscodeTexture ? 'texture created' : 'no texture');
  }, [nodes, materials, githubLoaded, vscodeLoaded, githubTexture, vscodeTexture]);

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