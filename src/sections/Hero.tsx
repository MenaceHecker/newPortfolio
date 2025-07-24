import React from 'react'

const words = [
    {text: 'Ideas', imgPath:'images/ideas.svg' },
    {text: 'Ideas', imgPath:'images/ideas.svg' },
]
const Hero = () => {
  return (
    <section id="hero" className='relative overflow-hidden'>
        <div className='absolute top-0 left-0 z-10'>
            <img src="/images/bg.png" alt="background" />
        </div>
        <div className='hero-layout'>
            <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5'>
                <div className='flex flex-col gap-7'>
                    <div className='hero-text'>
                        <h1>
                            The Last Time
                            <span className='slide'>
                                <span className='wrapper'>
                                    {words.map((word) => (
                                        <span key={word.text} className='flex items-center md:gap-3 gap-1 pb-2'>
                                            <img src={word.imgPath} alt={word.text} />
                                        </span>
                                    ))}
                                </span>

                            </span>

                        </h1>
                        <h1>Is Now</h1>
                        <h1>End of an Era</h1>
                    </div>

                </div>
            </header>
        </div>
    </section>
  )
}

export default Hero