import React, { useEffect, useRef, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { useScrollAnimation } from './useScrollAnimation.js'

const PINK_DARK = '#E44F76'
const PINK_LIGHT = '#F8B4C4'

const barData = [
  { label: 'Hungry', percent: 100, dark: true },
  { label: 'Moody', percent: 65, dark: false },
  { label: 'Smart', percent: 100, dark: true },
  // Display infinity, but keep percent numeric for bar width/ARIA
  { label: 'SUPER HUNGRY', percent: 100, display: '∞', dark: false },

]

function BarChart() {
  const wrapRef = useRef(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setAnimated(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimated(true)
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className='mt-4 space-y-4'>
      {barData.map((bar, i) => (
        <div key={i} className='flex flex-col gap-1'>
          <div className='flex items-center justify-between gap-3'>
            <span className='w-28 shrink-0 text-sm font-medium text-slate-600'>
              {bar.label}
            </span>
            <span
              className={`shrink-0 font-semibold text-slate-500 ${
                bar.display ? 'text-2xl leading-none' : 'text-sm'
              }`}
            >
              {bar.display ?? `${bar.percent}%`}
            </span>
          </div>
          <div
            className='h-7 w-full max-w-sm overflow-hidden rounded-full bg-slate-100'
            role='progressbar'
            aria-label={bar.label}
            aria-valuenow={animated ? bar.percent : 0}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className='h-full rounded-full transition-[width] duration-1000 ease-out'
              style={{
                width: animated ? `${bar.percent}%` : '0%',
                backgroundColor: bar.dark ? PINK_DARK : PINK_LIGHT,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function FeatureBox({ title, subtitle, iconBg, boxBg, Icon }) {
  return (
    <div
      className='flex items-center gap-4 rounded-2xl px-5 py-4 text-white shadow-lg'
      style={{ backgroundColor: boxBg }}
    >
      <div
        className='grid h-12 w-12 shrink-0 place-items-center rounded-full'
        style={{ backgroundColor: iconBg }}
      >
        <Icon className='h-6 w-6' />
      </div>
      <div>
        <div className='font-semibold'>{title}</div>
        <div className='text-sm opacity-90'>{subtitle}</div>
      </div>
    </div>
  )
}

export default function Section4({
  eyebrow = 'You + Me',
  title = 'My Safe',
  titleAccent = 'Place',
  body = 'You Know what the best think I love about you is your multiple personalities, ',  
  // chartTitle = 'Say It With Style',
  imageUrl,
  box1Title = 'My Favorite Human',
  box1Subtitle = 'I love how you are always there for me, no matter what',
  box2Title = 'Hearts and Minds',
  box2Subtitle = 'Thank you for being there for me, no matter what. Without you, I would never have done it. ',
}) {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 })
  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-white py-16 sm:py-24 ${isVisible ? 'section-animate' : 'section-hidden'}`}
    >
      {/* Decorative hearts */}
      <FaHeart className='pointer-events-none absolute left-8 top-32 h-8 w-8 text-[#E44F76] float-heart md:left-16 md:top-36' />
      <FaHeart className='pointer-events-none absolute right-8 top-10 h-8 w-8 text-[#E44F76]' />
      {/* Decorative stars */}
      <FaStar className='pointer-events-none absolute left-[55%] top-[52%] h-5 w-5 text-[#F8B4C4]' />
      <FaStar className='pointer-events-none absolute bottom-12 right-8 h-5 w-5 text-[#F8B4C4]' />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-12'>
        {/* Left: heading, text, chart */}
        <div>
          <p className='reveal text-sm font-medium text-slate-500' style={{ '--reveal-delay': '80ms' }}>
            {eyebrow}
          </p>
          <h2
            className='reveal mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]'
            style={{ '--reveal-delay': '150ms' }}
          >
            {title}{' '}
            <span className='text-[#E44F76]'>{titleAccent}</span>
          </h2>
          <p
            className='reveal mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base'
            style={{ '--reveal-delay': '240ms' }}
          >
            {body}
          </p>
          {/* <p className='mt-10 text-sm font-medium text-slate-600'>{chartTitle}</p> */}
          <div className='reveal' style={{ '--reveal-delay': '320ms' }}>
            <BarChart />
          </div>
        </div>

        {/* Right: image + feature boxes */}
        <div className='flex flex-col gap-8'>
          <div
            className='reveal reveal-zoom overflow-hidden rounded-2xl bg-pink-50/50 shadow-[0_12px_40px_rgba(0,0,0,0.12)]'
            style={{ '--reveal-delay': '160ms' }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt='Couple'
                className='h-[280px] w-full object-contain object-center sm:h-[320px]'
                loading='lazy'
              />
            ) : (
              <div className='flex h-[280px] w-full items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 sm:h-[320px]'>
                <span className='text-sm text-slate-500'>Add section4Image.jpeg</span>
              </div>
            )}
          </div>

          <div className='flex flex-col gap-4'>
            <div className='reveal' style={{ '--reveal-delay': '260ms' }}>
              <FeatureBox
                title={box1Title}
                subtitle={box1Subtitle}
                boxBg={PINK_DARK}
                iconBg='rgba(255,255,255,0.25)'
                Icon={FiHeart}
              />
            </div>
            <div className='reveal' style={{ '--reveal-delay': '340ms' }}>
              <FeatureBox
                title={box2Title}
                subtitle={box2Subtitle}
                boxBg={PINK_LIGHT}
                iconBg={PINK_DARK}
                Icon={FiHeart}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
