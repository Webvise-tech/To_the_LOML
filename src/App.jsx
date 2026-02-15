import React from 'react'
import './index.css'
import HeroSection from './HeroSection.jsx'
import heroImage from './assets/heroImage.jpeg'
import Section2 from './Section2.jsx'
import mainHeart from './assets/mainHeart.jpeg'
import smallHeart from './assets/smallHeart.jpeg'
import section3Main from './assets/section3 main.jpeg'
import Section3 from './Section3.jsx'
import Section4 from './Section4.jsx'
import section4Image from './assets/section3 secondary.jpeg'
import Section5 from './Section5.jsx'

// Section 5 carousel: use existing assets (add section5-1.jpeg, section5-2.jpeg, etc. in assets if you have dedicated trip photos)
const section5Images = [mainHeart, smallHeart, section3Main, section4Image]

const App = () => {
  return (
    <div className='min-h-screen bg-white'>
      <HeroSection bgImageUrl={heroImage} />
      <Section2 mainHeartImageUrl={mainHeart} smallHeartImageUrl={smallHeart} />
      <Section3 bigCircleImageUrl={section3Main} />
      <Section4 imageUrl={section4Image} />
      <Section5 images={section5Images} />
    </div>
  )
}

export default App