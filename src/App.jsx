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
import section5Image1 from './assets/section5 1.jpeg'
import section5Image2 from './assets/section5 2.jpeg'
import section5Image3 from './assets/section5 3.jpeg'


import section5Image4 from './assets/section5 4.jpeg'

// Section 5 carousel: 5 images for testing swiper
const section5Images = [section5Image1, section5Image2, section5Image3, section5Image4]

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