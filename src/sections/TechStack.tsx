import TechIcon from "../components/Models/TechLogos/TechIcon"
import TitleHeader from "../components/TitleHeader"
import { techStackIcons, techStackImgs } from "../constants"
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const TechStack = () => {
    const containerRef = useRef(null)

    useGSAP(() => {
        // Entry animation
        gsap.fromTo('.tech-card', {
            y: 50, 
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
            stagger: 0.2,
            scrollTrigger: {
                trigger: '#skills',
                start: 'top center'
            }
        })

        // Hover animations for each card
        const cards = document.querySelectorAll('.tech-card')
        
        cards.forEach((card) => {
            const animatedBg = card.querySelector('.tech-card-animated-bg')
            const popupBg = card.querySelector('.popup-background')
            const content = card.querySelector('.tech-card-content')
            const icon = card.querySelector('.tech-icon-wrapper')
            const textElement = card.querySelector('.tech-name')
            
            // Set initial states
            gsap.set(popupBg, {
                scale: 0,
                opacity: 0,
                transformOrigin: 'center center'
            })
            
            // Mouse enter animation - gradual popup
            card.addEventListener('mouseenter', () => {
                // Card lift and scale
                gsap.to(card, {
                    scale: 1.05,
                    y: -8,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Popup background appears gradually
                gsap.to(popupBg, {
                    scale: 1.2,
                    opacity: 0.9,
                    duration: 0.5,
                    ease: 'back.out(1.7)' // Bouncy effect
                })
                
                // Original animated background fades
                gsap.to(animatedBg, {
                    opacity: 0.2,
                    duration: 0.3,
                    ease: 'power2.out'
                })
                
                // Icon animation with bounce
                gsap.to(icon, {
                    scale: 1.15,
                    rotation: 10,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                })
                
                // Content lift
                gsap.to(content, {
                    y: -3,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Text glow effect
                gsap.to(textElement, {
                    textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                    color: '#ffffff',
                    fontWeight: 600,
                    duration: 0.3,
                    ease: 'power2.out'
                })
            })
            
            // Mouse leave animation - gradual fade out
            card.addEventListener('mouseleave', () => {
                // Card returns to normal
                gsap.to(card, {
                    scale: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Popup background disappears gradually
                gsap.to(popupBg, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.inOut'
                })
                
                // Original animated background returns
                gsap.to(animatedBg, {
                    opacity: 0.6,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Icon returns to normal
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Content returns
                gsap.to(content, {
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                })
                
                // Text returns to normal
                gsap.to(textElement, {
                    textShadow: 'none',
                    color: 'inherit',
                    fontWeight: 400,
                    duration: 0.3,
                    ease: 'power2.out'
                })
            })
        })

        // Cleanup function
        return () => {
            cards.forEach((card) => {
                card.removeEventListener('mouseenter', () => {})
                card.removeEventListener('mouseleave', () => {})
            })
        }
    }, { scope: containerRef })

    return (
        <div ref={containerRef} id="skills" className="flex-center section-padding" style={{contain: 'layout style paint'}}>
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="My Favorite Tech Stack"
                    sub="The skills I bring to the Table"/>
                <div className="tech-grid">
                    {techStackIcons.map((icon) => (
                        <div 
                            key={icon.name} 
                            className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg cursor-pointer relative"
                            style={{ transformOrigin: 'center' }}
                        >
                            {/* Original animated background */}
                            <div className="tech-card-animated-bg absolute inset-0 opacity-60"/>
                            
                            {/* New popup background with gradient */}
                            <div className="popup-background absolute inset-0 bg-gradient-to-br from-blue-500/80 via-purple-500/80 to-pink-500/80 backdrop-blur-sm"/>
                            
                            {/* Subtle pulse effect overlay */}
                            <div className="absolute inset-0 bg-white/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                            
                            <div className="tech-card-content relative z-10">
                                <div className="tech-icon-wrapper transition-transform duration-300">
                                    <TechIcon model={icon}/>
                                </div>
                                <div className="padding-x w-full">
                                   <p className="tech-name transition-all duration-300">{icon.name}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    {techStackImgs.map((icon) => 
                    <div className="">

                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default TechStack