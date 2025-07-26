import Hero from './sections/Hero'
import AnimatedCounter from './components/AnimatedCounter'
import ShowcaseSection from './sections/ShowcaseSection'
import Nav from './components/navbar'
import LogoSection from './components/LogoSection'

const App = () => {
  return (
    <>
    <Hero/>
    <Nav/>
    <AnimatedCounter/>
    <ShowcaseSection/>
    <LogoSection/>
    </>
  )
}

export default App