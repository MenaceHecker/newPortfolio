import { Environment, Float, OrbitControls} from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as THREE from 'three'

const ContactExperience = () => {
  return (
    <Canvas camera={{position: [0,3,7], fov: 45}} shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5,5,5]} intensity={1}/>
      <spotLight
      position={[-5,5,5]}
      angle={0.15}
      penumbra={1}
      intensity={1}
      castShadow
      />
    </Canvas>
  )
}

export default ContactExperience