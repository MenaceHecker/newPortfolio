import GlowCard from "../components/GlowCard"
import TitleHeader from "../components/TitleHeader"
import { expCards } from "../constants"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React from 'react'

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  useGSAP(() => {
    const timelineCards = gsap.utils.toArray('.timeline-card') as HTMLElement[];
    const timelineLogos = gsap.utils.toArray('.timeline-logo') as HTMLElement[];
    
    timelineLogos.forEach((logo) => {
      gsap.fromTo(logo,
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: logo,
            start: 'top 85%',
            end: 'top 50%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
    const backgroundTimeline = document.querySelector('.timeline-background') as HTMLElement;
    if (backgroundTimeline && timelineLogos.length > 0) {
      gsap.fromTo(backgroundTimeline, 
        {
          scaleY: 0,
          transformOrigin: 'top center'
        },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-logo:first-child',
            start: 'top 80%', 
            end: '.timeline-logo:last-child top 30%', 
            scrub: 1.5, 
            toggleActions: 'play none none reverse'
          }
        }
      )
    }

    timelineCards.forEach((card) => {
      gsap.fromTo(card,
        {
          xPercent: -100, 
          opacity: 0,
          transformOrigin: 'left left'
        },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.easeInOut',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    const expTexts = gsap.utils.toArray('.expText') as HTMLElement[];
    expTexts.forEach((text) => {
      gsap.fromTo(text,
        {
          x: 50,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: text,
            start: 'top 70%',
            end: 'top 35%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })
  }, []);

  return (
    <section id="experience" className="w-full md:mt-40 mt-20 section-padding xl:px-0 relative z-10">
        <div className="w-full h-full md:px-20 px-5">
            <TitleHeader 
            title="Professional Work Experience" 
            sub=" 💼 My Career Overview"/>
            <div className="mt-32 relative">
              <div className="absolute xl:left-[35.5vw] md:left-10 left-5 top-0 w-1 h-full bg-gradient-to-b from-purple-400 to-blue-500 timeline-background z-5"></div>
              
              <div className="relative z-20 xl:space-y-32 space-y-10">
                {expCards.map((card, index) => (
                  <div key={card.title} className="exp-card-wrapper timeline-card">
                    <div className="xl:w-2/6">
                    <GlowCard card={card} index={index}>
                      <div>
                        <img src={card.imgPath} alt={card.title} />
                      </div> 
                    </GlowCard>
                    </div>
                    <div className="xl:w-4/6 ">
                    <div className="flex items-start">
                      <div className="timeline-wrapper">
                        <div className="timeline-line w-1 h-full opacity-0"/>
                      </div>
                      <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-30">
                        <div className="timeline-logo">
                          <img src={card.logoPath} alt="logo" />
                        </div>
                        <div>
                          <h1 className="font-semibold text-3xl">{card.title}</h1>
                          <p className="my-5 text-white-50">
                            📅{card.date}
                          </p>
                          <p className="text-[#839cb5] italic"> Responsibilities</p>
                          <ul className="list-disc ms-5 mt-5 flex flex-col gap-5 text-white-50">
                            {card.responsibilities.map((responsibility: string) => (
                              <li key={responsibility} className="text-lg">
                                {responsibility}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    </div>
                    </div>
                ))}
              </div>
            </div>
        </div>
    </section>
  )
}

export default ExperienceSection