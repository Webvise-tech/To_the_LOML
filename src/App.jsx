import React from 'react'
import './index.css'
import HeroSection from './HeroSection.jsx'
import heroImage from './assets/heroImage.jpeg'
import Section2 from './Section2.jsx'
import mainHeart from './assets/mainHeart.jpeg'
import smallHeart from './assets/smallHeart.jpeg'
import Section3 from './Section3.jsx'

const App = () => {
  return (
    <div className='min-h-screen bg-white'>
      {/* Option A (recommended): put image in `public/images/hero.jpg` and use: */}
      {/* <HeroSection bgImageUrl="/images/hero.jpg" /> */}

      {/* Option B: put image in `src/assets/` then import it here, e.g.:
          import heroBg from './assets/hero.jpg'
          <HeroSection bgImageUrl={heroBg} />
      */}
      <HeroSection bgImageUrl={heroImage} />
      <Section2 mainHeartImageUrl={mainHeart} smallHeartImageUrl={smallHeart} />
      <Section3 />
    </div>
  )
}

export default App