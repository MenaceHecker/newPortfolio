import { Environment, Float, useGLTF, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const TechIcon = ({model}: {model: any}) => {
  // Handle both number and array scale values
  const scale = typeof model.scale === 'number' ? model.scale : (model.scale || [1, 1, 1]);
  const rotation = model.rotation || [0, 0, 0];
  const gltf = useGLTF(model.modelPath) as any;
  const scene = gltf.scene;
  
  useEffect(() => {
    if(model.name === 'Interactive Developer' && scene){
        scene.traverse((child: any) => {
            if(child.isMesh && child.name === 'Object5'){
                child.material = new THREE.MeshStandardMaterial({color: 'white'})
            }
        })
    }
  }, [scene, model.name]) // Added dependency array
  
  return (
    <Canvas>
        <ambientLight intensity={0.3}/>
        <directionalLight position={[5,5,5]} intensity={1}/>
        <Environment preset="city"/>
        <OrbitControls enableZoom={false}/>
        <Float speed={5.5} rotationIntensity={0.5} floatIntensity={0.9}>
            <group scale={scale} rotation={rotation}>
                <primitive object={scene}/>
            </group>
        </Float>
    </Canvas>
  )
}

export default TechIcon