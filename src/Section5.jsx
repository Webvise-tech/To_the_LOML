import React, { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaHeart, FaMapMarkerAlt, FaPlus, FaUsers } from 'react-icons/fa'
import { useScrollAnimation } from './useScrollAnimation.js'

function CircleImage({ src, alt = '', className = '' }) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full bg-pink-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-4 ring-pink-200/80 ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className='absolute inset-0 h-full w-full object-cover object-center'
          loading='lazy'
        />
      ) : (
        <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-pink-200 to-pink-400 text-white/80'>
          <span className='text-sm'>Photo</span>
        </div>
      )}
    </div>
  )
}

function FeatureBlock({ icon: Icon, title, description }) {
  return (
    <div className='flex gap-4'>
      <div className='grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#E44F76] text-white'>
        <Icon className='h-6 w-6' />
      </div>
      <div>
        <h3 className='font-semibold text-slate-800'>{title}</h3>
        <p className='mt-2 text-sm leading-6 text-slate-500'>{description}</p>
      </div>
    </div>
  )
}

const CIRCLE_SIZE_MOBILE = 180
const CIRCLE_SIZE_DESKTOP = 200
const GAP = 24

export default function Section5({
  eyebrow = 'Our First Trip',
  title = 'Where We Went',
  titleAccent = 'Sharm El Sheikh',
  block1Title = "Adventure's Heart",
  block1Description = 'Best 4days of my life I would never forget this trip one of the best experiences of my life . And it was with you ',
  block2Title = 'Next Trip',
  block2Description = 'I can\'t wait to go on another trip with you, I know it will be amazing ',
  images: imagesProp,
  image1Url,
  image2Url,
  image3Url,
}) {
  const images = Array.isArray(imagesProp) && imagesProp.length > 0
    ? imagesProp
    : [image1Url, image2Url, image3Url].filter(Boolean)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile: show 1, Desktop: show 3
  const visibleCount = isMobile ? 1 : 3
  const circleSize = isMobile ? CIRCLE_SIZE_MOBILE : CIRCLE_SIZE_DESKTOP
  const step = circleSize + GAP
  const maxIndex = Math.max(0, images.length - visibleCount)
  const viewportWidth = circleSize * visibleCount + GAP * (visibleCount - 1)

  const goPrev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const goNext = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1))
  const showArrows = images.length > visibleCount
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 })

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-pink-50 py-16 sm:py-24 ${isVisible ? 'section-animate' : 'section-hidden'}`}
    >
      {/* Decorative: plus below title */}
      <FaPlus className='pointer-events-none absolute left-1/2 top-52 h-4 w-4 -translate-x-1/2 text-[#E44F76] md:top-48' />
      {/* Heart above second feature block */}
      <FaHeart className='pointer-events-none absolute right-12 top-36 h-6 w-6 text-[#E44F76] float-heart md:right-24 md:top-32' />
      {/* Heart above first (left) circle */}
      <FaHeart className='pointer-events-none absolute left-[18%] top-[72%] h-6 w-6 text-[#E44F76] md:left-[22%]' />
      {/* Plus signs at bottom center */}
      <FaPlus className='pointer-events-none absolute bottom-24 left-[42%] h-4 w-4 text-[#E44F76]' />
      <FaPlus className='pointer-events-none absolute bottom-24 right-[42%] h-4 w-4 text-[#E44F76]' />

      <div className='mx-auto max-w-6xl px-6 md:px-12'>
        {/* Top: left title + right feature blocks */}
        <div className='grid grid-cols-1 gap-12 pb-16 md:grid-cols-[1fr_1fr] md:gap-16'>
          <div>
            <p className='reveal text-sm font-medium text-slate-500' style={{ '--reveal-delay': '80ms' }}>
              {eyebrow}
            </p>
            <h2
              className='reveal mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]'
              style={{ '--reveal-delay': '150ms' }}
            >
              {title}
              <br />
              <span className='text-[#E44F76]'>{titleAccent}</span>
            </h2>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='reveal reveal-right' style={{ '--reveal-delay': '210ms' }}>
              <FeatureBlock
                icon={FaMapMarkerAlt}
                title={block1Title}
                description={block1Description}
              />
            </div>
            <div className='reveal reveal-right' style={{ '--reveal-delay': '290ms' }}>
              <FeatureBlock
                icon={FaUsers}
                title={block2Title}
                description={block2Description}
              />
            </div>
          </div>
        </div>

        {/* Bottom: responsive carousel - 1 on mobile, 3 on desktop */}
        <div
          className='reveal reveal-zoom relative flex items-center justify-center gap-6 rounded-3xl bg-pink-100/80 px-4 py-12 sm:gap-4 sm:px-14 sm:py-14 md:px-16'
          style={{ '--reveal-delay': '220ms' }}
        >
          <button
            type='button'
            onClick={goPrev}
            disabled={!showArrows}
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#E44F76] shadow-lg transition hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E44F76] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none sm:h-12 sm:w-12'
            aria-label='Previous'
          >
            <FaChevronLeft className='h-5 w-5 sm:h-6 sm:w-6' />
          </button>

          <div className='overflow-hidden' style={{ width: viewportWidth }}>
            <div
              className='flex transition-transform duration-300 ease-out'
              style={{
                transform: `translateX(-${currentIndex * step}px)`,
                gap: `${GAP}px`,
              }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className='shrink-0 overflow-hidden rounded-full'
                  style={{ width: circleSize, height: circleSize }}
                >
                  <CircleImage
                    src={src}
                    alt={`Trip photo ${i + 1}`}
                    className='h-full w-full'
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={goNext}
            disabled={!showArrows}
            className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#E44F76] shadow-lg transition hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E44F76] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none sm:h-12 sm:w-12'
            aria-label='Next'
          >
            <FaChevronRight className='h-5 w-5 sm:h-6 sm:w-6' />
          </button>
        </div>
      </div>
    </section>
  )
}
