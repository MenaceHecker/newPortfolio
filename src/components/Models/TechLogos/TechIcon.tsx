import { Environment, Float, useGLTF } from "@react-three/drei"
import { Canvas } from "@react-three/fiber";

const TechIcon = ({model}) => {
  const scene = useGLTF(model.modelPath);
    return (
    <Canvas>
        <ambientLight intensity={0.3}/>
        <Environment preset="city"/>
        <Float speed={5.5}>
            <group>
                <primitive object={scene.scene}/>
            </group>
        </Float>
    </Canvas>
  )
}

export default TechIcon