import { socialImgs } from "../constants"

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-container flex justify-between items-center w-full">
            <div className="socials">
                {socialImgs.map((img)=> (
                    <a className="icon" target="_blank" href={img.url} key={img.url} >
                        <img src={img.imgPath} />
                    </a>
                ))}
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-right">
                    ©{new Date().getFullYear()} Tushar • End of an Era, Start of Another
                </p>
            </div>
        </div>
    </footer>
  )
}

export default Footer