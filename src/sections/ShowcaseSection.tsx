import { useRef } from "react"
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {useGSAP} from '@gsap/react'

gsap.registerPlugin(ScrollTrigger);

const ShowcaseSection = () => {
    const sectionRef = useRef(null);
    const project1Ref = useRef(null); 
    const project2Ref = useRef(null); 
    const project3Ref = useRef(null); 

    useGSAP(() => {
        // Create the projects array inside useGSAP where refs are available
        const projects = [project1Ref.current, project2Ref.current, project3Ref.current];
        
        projects.forEach((card, index) => {
            // Check if card exists before animating
            if (card) {
                gsap.fromTo(
                    card,
                    {
                        y: 50, 
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        delay: 0.3 * (index + 1),
                        scrollTrigger: {
                            trigger: card, 
                            start: 'top bottom-=100'
                        }
                    }
                )
            }
        });
        
        if (sectionRef.current) {
            gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
        }
    }, []);

    return (
        <section id="work" ref={sectionRef} className='app-showcase'>
            <div className='w-full'>
                <div className='showcaselayout'>
                {/* LEFT SIDE */}
                <div className="first-project-wrapper" ref={project1Ref}>
                    <div className="image-wrapper">
                        <img src="/images/project1.png" alt="crumb" />
                    </div>
                    <div className="text-content">
                        <h2>New Innovative way to make Friends with crumb</h2>
                        <p className="text-white-50 md:text-xl">
                            An App built with React Native, Expo, Supabase and TailwindCSS with fast UI
                        </p>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <div className="project-list-wrapper overflow-hidden">
                    <div className="project" ref={project2Ref}>
                        <div className="image-wrapper bg-[#d5d0c8]">
                            <img src="/images/project2.png" alt="Email Organizer" />
                        </div>
                        <h2>Smart Email Organizer</h2>
                    </div>
                    <div className="project" ref={project3Ref}>
                        <div className="image-wrapper bg-[#d5d0c8]">
                            <img src="/images/project3.png" alt="Email Organizer" />
                        </div>
                        <h2>CareerSync Resume Matcher</h2>
                    </div>
                </div>
                </div>
            </div>
        </section>
    )
}

export default ShowcaseSection