import { useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";

const TechIcon = ({model}) => {
  const scene = useGLTF(model.modelPath);
    return (
    <Canvas>
        
    </Canvas>
  )
}

export default TechIcon