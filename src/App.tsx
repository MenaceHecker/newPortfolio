import { useState } from 'react'
import SplashScreen from './components/SplashScreen'
import Hero from './sections/Hero'
import AnimatedCounter from './components/AnimatedCounter'
import ShowcaseSection from './sections/ShowcaseSection'
import Nav from './components/navbar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'
import ExperienceSection from './sections/ExperienceSection'
import TechStack from './sections/TechStack'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const App = () => {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      {!showSplash && (
        <>
          <Hero/>
          <Nav/>
          <AnimatedCounter/>
          <ShowcaseSection/>
          <LogoSection/>
          <FeatureCards/>
          <ExperienceSection/>
          <TechStack/>
          <Contact/>
          <Footer/>
        </>
      )}
    </>
  )
}

export default App