import React from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import * as THREE from 'three'

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh
    Object_6: THREE.Mesh
    Object_8: THREE.Mesh
    Object_9: THREE.Mesh
    Object_10: THREE.Mesh
    Object_12: THREE.Mesh
    Object_13: THREE.Mesh
    Object_15: THREE.Mesh
    Object_22: THREE.Mesh
    Object_24: THREE.Mesh
    Object_26: THREE.Mesh
    Object_28: THREE.Mesh
    Object_29: THREE.Mesh
  }
  materials: {
    'Material.001': THREE.Material
    PaletteMaterial001: THREE.Material
    'Material.003': THREE.Material
    'Material.004': THREE.Material
    'Material.005': THREE.Material
    PaletteMaterial002: THREE.Material
    screen: THREE.Material
    PaletteMaterial003: THREE.Material
    'Material.007': THREE.Material
    'Material.008': THREE.Material
    PaletteMaterial004: THREE.Material
    PaletteMaterial005: THREE.Material
    'Material.013': THREE.Material
  }
}

interface GamingSetupProps {
  [key: string]: any
}

export function GamingSetup(props: GamingSetupProps): React.JSX.Element {
  const { nodes, materials } = useGLTF('/models/gaming_setup_low-poly-transformed.glb') as unknown as GLTFResult
  
  // Debug: Log the model data
  console.log('GamingSetup nodes:', nodes)
  console.log('GamingSetup materials:', materials)
  
  return (
    <group {...props} dispose={null}>
      {/* Base/Desk components */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Object_4.geometry} 
        material={materials['Material.001']} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={0.349} 
      />
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Object_6.geometry} 
        material={materials.PaletteMaterial001} 
        rotation={[Math.PI / 2, 0, 0]} 
        scale={0.349} 
      />
      
      {/* Monitor group */}
      <group position={[-0.001, 0.933, -0.883]} rotation={[Math.PI / 2, 0, 0]} scale={0.177}>
        <mesh castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials['Material.003']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_9.geometry} material={materials['Material.004']} />
        <mesh castShadow receiveShadow geometry={nodes.Object_10.geometry} material={materials['Material.005']} />
      </group>
      
      {/* Screen/Display group */}
      <group position={[-0.267, 0.904, -0.347]} rotation={[Math.PI / 2, 0, 0.153]} scale={0.542}>
        <mesh castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials.PaletteMaterial002} />
        <mesh castShadow receiveShadow geometry={nodes.Object_13.geometry} material={materials.screen} />
        <mesh castShadow receiveShadow geometry={nodes.Object_15.geometry} material={materials.PaletteMaterial003} />
      </group>
      
      {/* Accessories */}
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Object_22.geometry} 
        material={materials['Material.007']} 
        position={[0.184, 0.908, 0.144]} 
        rotation={[Math.PI / 2, 0, -1.607]} 
        scale={0.273} 
      />
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Object_24.geometry} 
        material={materials['Material.008']} 
        position={[0.184, 0.911, -0.371]} 
        rotation={[Math.PI / 2, 0, -1.405]} 
        scale={0.065} 
      />
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.Object_26.geometry} 
        material={materials.PaletteMaterial004} 
        position={[0.16, 0.907, 0]} 
        scale={[0.203, 0.349, 0.64]} 
      />
      
      {/* Chair group */}
      <group position={[0.834, 0, -0.127]} rotation={[Math.PI / 2, 0, 2.27]} scale={0.286}>
        <mesh castShadow receiveShadow geometry={nodes.Object_28.geometry} material={materials.PaletteMaterial005} />
        <mesh castShadow receiveShadow geometry={nodes.Object_29.geometry} material={materials['Material.013']} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/gaming_setup_low-poly-transformed.glb')
