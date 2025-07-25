import { div } from "three/tsl"
import { counterItems } from "../constants"

const AnimatedCounter = () => {
  return (
    <div id="counter" className="padding-x-lg xl:mt-0 mt-32">
        <div className="mx-auto grid-4-cols">
            {counterItems.map((item) => (
                <div key={item.label} className="counter-number text-white text-5xl font-bold mb-2">
                    0 {item.suffix}
               </div>     
            ))}
        </div>
    </div>
  )
}

export default AnimatedCounter