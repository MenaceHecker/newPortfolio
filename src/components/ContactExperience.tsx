import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
// import { Computer } from "./Models/Computer-optimized_new"
import { GamingSetup } from '../components/Models/GamingSetup'

const ContactExperience = () => {
  return (
    <Canvas 
      camera={{position: [0,3,7], fov: 45}} 
      shadows
      style={{ background: '#597579' }}
    >
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight position={[5,5,3]} intensity={2.5} color="ffffff"/>
      <directionalLight
        position={[5,9,1]}
        castShadow
        intensity={2.5}
        color="#ffd9b3"
      />
      {/* <spotLight
      position={[-5,5,5]}
      angle={0.15}
      penumbra={1}
      intensity={1}
      castShadow
      /> */}
      
      {/* Removed Environment preset to use custom background */}
      {/* <Environment preset="city"/> */}
       
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI/4}
        maxPolarAngle={Math.PI/2}
        />
        <group scale={2.5} position={[-1, -1.5, -0.75]} castShadow>
          {/* <Computer/> */}
          <GamingSetup/>
        </group>
        <group scale={[1,1,1]}>
          <mesh receiveShadow position={[0,-1.5,0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[30,30]}/>
            <meshStandardMaterial color="a46b2d"/>
          </mesh>
        </group>
    </Canvas>
  )
}

export default ContactExperience