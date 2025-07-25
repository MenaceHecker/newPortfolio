import Hero from './sections/Hero'
import AnimatedCounter from './components/AnimatedCounter'
import ShowcaseSection from './sections/ShowcaseSection'
import Nav from './components/navbar'
import LogoSection from './sections/LogoSection'
import FeatureCards from './sections/FeatureCards'

const App = () => {
  return (
    <>
    <Hero/>
    <Nav/>
    <AnimatedCounter/>
    <ShowcaseSection/>
    <LogoSection/>
    <FeatureCards/>
    </>
  )
}

export default App