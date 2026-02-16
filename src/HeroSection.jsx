import React, { useEffect, useState } from 'react'
import { FaCloud, FaHeart } from 'react-icons/fa'

function Sparkle({ className = '' }) {
  return (
    <svg
      viewBox='0 0 24 24'
      aria-hidden='true'
      className={className}
      fill='currentColor'
    >
      <path d='M12 2l1.4 6.1L20 12l-6.6 3.9L12 22l-1.4-6.1L4 12l6.6-3.9L12 2z' />
    </svg>
  )
}

function Wave({ className = '' }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 1440 320'
      preserveAspectRatio='none'
      aria-hidden='true'
      className={className}
    >
      <path
        fill='currentColor'
        fillOpacity='1'
        d='M0,224L40,218.7C80,213,160,203,240,213.3C320,224,400,256,480,240C560,224,640,160,720,154.7C800,149,880,203,960,213.3C1040,224,1120,192,1200,197.3C1280,203,1360,245,1400,266.7L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
      />
    </svg>
  )
}

/**
 * Hero section (Valentine).
 *
 * Image usage options:
 * - Put a file in `public/images/hero.jpg` and pass `bgImageUrl="/images/hero.jpg"`.
 * - OR import from `src/assets` in `App.jsx` and pass that import as `bgImageUrl`.
 */
export default function HeroSection({
  bgImageUrl,
  title = 'Valentine',
  subtitle = 'Falling in Love with Your Message',
}) {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
  }, [])
  return (
    <section className={`relative min-h-screen overflow-hidden ${isVisible ? 'section-animate-fade' : 'section-hidden'}`}>
      {/* Background image */}
      <div
        className='absolute inset-0 bg-cover bg-center opacity-65'
        style={{
          backgroundImage: bgImageUrl ? `url(${bgImageUrl})` : undefined,
        }}
      />

      {/* Pink overlay (to match screenshot tint) */}
      <div className='absolute inset-0 bg-pink-600/80' />

      {/* Top decorations */}
      <div className='pointer-events-none absolute left-0 right-0 top-0'>
        <FaCloud className='absolute left-10 top-8 h-14 w-14 text-white/95' />
        <FaCloud className='absolute right-10 top-8 h-14 w-14 text-white/95' />

        <Sparkle className='absolute left-32 top-14 h-4 w-4 text-white/90' />
        <Sparkle className='absolute right-40 top-12 h-3.5 w-3.5 text-white/90' />
        <Sparkle className='absolute right-24 top-20 h-3 w-3 text-white/80' />
      </div>

      {/* Center content */}
      <div className='relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center'>
        <h1 className='select-none font-valentine text-[clamp(3.5rem,12vw,7.5rem)] leading-[0.95] tracking-wide text-white drop-shadow-[0_12px_40px_rgba(0,0,0,0.25)]'>
          {title === 'Valentine' ? (
            <>
              Valent
              <span className='relative inline-block'>
                i
                <FaHeart className='absolute -top-7 left-1/2 h-10 w-10 -translate-x-1/2 text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.18)]' />
              </span>
              ne
            </>
          ) : (
            title
          )}
        </h1>

        <p className='mt-6 text-sm font-medium tracking-wide text-white/80 sm:text-base'>
          {subtitle}
        </p>
      </div>

      {/* Bottom “cloud” layer */}
      <div className='pointer-events-none absolute bottom-0 left-0 right-0'>
        {/* Your provided SVG wave (fill: #F2A1AD) */}
        <div className='relative'>
          <Wave className='h-56 w-full text-[#F2A1AD]' />

          {/* floating hearts (sit on top of the wave) */}
          <FaHeart className='absolute left-16 top-14 h-9 w-9 text-white/95' />
          <FaHeart className='absolute left-44 top-20 h-6 w-6 text-white/90' />
          <FaHeart className='absolute right-24 top-16 h-8 w-8 text-white/95' />
          <FaHeart className='absolute right-44 top-22 h-6 w-6 text-white/90' />
        </div>
      </div>
    </section>
  )
}

