import { logoIconsList } from "../constants"

interface IconType {
    imgPath: string;
}

const LogoIcon = ({ icon }: { icon: IconType }) => {
    return (
        <div className="flex-none flex-center marquee-item">
            <img src={icon.imgPath} alt="Logo" />
        </div>
    )
}

const LogoSection = () => {
  return (
    <div className="md:my-20 my-10 relative">
        <div className="gradient-edge"/>
        <div className="gradient-edge"/>

        <div className="marquee h-52">
            <div className="marquee-box md:gap-12 gap-5">
                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={index} icon={icon} />
                ))}
                {logoIconsList.map((icon, index) => (
                    <LogoIcon key={`duplicate-${index}`} icon={icon} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default LogoSection