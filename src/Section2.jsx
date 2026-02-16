import React, { useEffect, useId, useRef, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'
import { FiMoreVertical } from 'react-icons/fi'
import { useScrollAnimation } from './useScrollAnimation.js'

function HeartMaskedImage({
  src,
  className = '',
  strokeWidth = 1.5,
  preserve = 'xMidYMid slice',
  overscan = preserve === 'xMidYMid slice' ? 2 : 0,
  contentScale = 1,
  blurBehind = false,
  alt = '',
}) {
  const clipId = useId()
  const blurId = useId()
  const heartPath =
    'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'

  const safeScale = Math.max(0.5, Math.min(1.25, contentScale))
  const baseSize = 24 + overscan * 2
  const scaledSize = baseSize * safeScale
  const scaledOffset = (baseSize - scaledSize) / 2

  return (
    <svg
      viewBox='0 0 24 24'
      className={className}
      role={alt ? 'img' : 'presentation'}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={heartPath} />
        </clipPath>
        {blurBehind ? (
          <filter id={blurId} x='-30%' y='-30%' width='160%' height='160%'>
            <feGaussianBlur stdDeviation='1.6' />
          </filter>
        ) : null}
      </defs>

      {src ? (
        <>
          {blurBehind ? (
            <image
              href={src}
              x={-2}
              y={-2}
              width={28}
              height={28}
              preserveAspectRatio='xMidYMid slice'
              clipPath={`url(#${clipId})`}
              filter={`url(#${blurId})`}
              opacity='0.65'
            />
          ) : null}
          <image
            href={src}
            x={-overscan + scaledOffset}
            y={-overscan + scaledOffset}
            width={scaledSize}
            height={scaledSize}
            preserveAspectRatio={preserve}
            clipPath={`url(#${clipId})`}
          />
        </>
      ) : (
        <g clipPath={`url(#${clipId})`}>
          <rect width='24' height='24' fill='#ffd1dc' />
          <circle cx='16' cy='9' r='7' fill='#ff8fab' opacity='0.65' />
          <circle cx='8' cy='17' r='8' fill='#ff4d6d' opacity='0.35' />
        </g>
      )}

      {/* white border like the reference */}
      <path
        d={heartPath}
        fill='none'
        stroke='white'
        strokeWidth={strokeWidth}
        strokeLinejoin='round'
      />
    </svg>
  )
}

function ProgressRow({ label = 'Memorable', value = 100 }) {
  const wrapRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const target = wrapRef.current
    if (!target) return

    const clamped = Math.max(0, Math.min(100, value))
    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      setProgress(clamped)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setProgress(0)
          requestAnimationFrame(() => setProgress(clamped))
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={wrapRef} className='mt-10 max-w-md'>
      <div className='flex items-center gap-4'>
        <div className='grid h-12 w-12 place-items-center rounded-full bg-[#E44F76]/15 text-[#E44F76]'>
          <FaHeart className='h-6 w-6' />
        </div>

        <div className='flex min-w-0 flex-1 items-center justify-between gap-3'>
          <div className='truncate text-sm font-semibold text-slate-700'>
            {label}
          </div>
          <div className='flex items-center gap-3 text-sm font-semibold text-slate-500'>
            <span>{Math.max(0, Math.min(100, value))}%</span>
            <FiMoreVertical className='h-5 w-5' />
          </div>
        </div>
      </div>

      <div
        className='mt-3 h-2 w-full rounded-full bg-slate-200'
        role='progressbar'
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className='h-2 rounded-full bg-[#E44F76] transition-[width] duration-1000 ease-out will-change-[width]'
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default function Section2({
  eyebrow = 'Why Stories Make Ideas Stick',
  titleAccent = 'The Romance Of',
  title = 'Storytelling',
  body = 'Cupiditate nonproident, sed quia amor movet animos et creat memoriam. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
  mainHeartImageUrl,
  smallHeartImageUrl,
}) {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.15 })
  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden bg-white py-16 sm:py-24 ${isVisible ? 'section-animate' : 'section-hidden'}`}
    >
      {/* decorative bits */}
      <FaHeart className='pointer-events-none absolute left-8 top-10 h-8 w-8 text-[#E44F76] float-heart' />
      <FaHeart className='pointer-events-none absolute right-10 top-12 h-11 w-11 text-[#E44F76] float-heart-slow float-heart-delay' />
      <FaStar className='pointer-events-none absolute left-1/2 top-20 h-4 w-4 -translate-x-1/2 text-[#E44F76]' />
      <FaStar className='pointer-events-none absolute left-2/3 top-44 h-3.5 w-3.5 text-[#E44F76]' />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2'>
        {/* left */}
        <div>
          <div className='text-sm font-medium text-slate-400'>{eyebrow}</div>

          <h2 className='mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl'>
            <span className='text-[#E44F76]'>{titleAccent}</span>
            <br />
            {title}
          </h2>

          <p className='mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base'>
            {body}
          </p>

          <ProgressRow label='Memorable' value={100} />
        </div>

        {/* right */}
        <div className='relative mx-auto w-full max-w-lg'>
          <div className='relative ml-auto w-[min(520px,100%)]'>
            <HeartMaskedImage
              src={mainHeartImageUrl}
              alt='Couple photo'
              strokeWidth={1.3}
              preserve='xMidYMid meet'
              className='h-[420px] w-[420px] drop-shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:h-[520px] sm:w-[520px]'
            />

            <div className='absolute -bottom-20 left-4 sm:-bottom-24'>
              <HeartMaskedImage
                src={smallHeartImageUrl}
                alt='Second photo'
                strokeWidth={1.5}
                preserve='xMidYMid meet'
                overscan={0}
                contentScale={0.86}
                blurBehind
                className='h-[240px] w-[240px] drop-shadow-[0_18px_45px_rgba(0,0,0,0.10)] sm:h-[300px] sm:w-[300px]'
              />
            </div>
          </div>

          <FaHeart className='pointer-events-none absolute -right-2 bottom-10 h-8 w-8 text-[#E44F76] float-heart' />
          <FaStar className='pointer-events-none absolute -left-2 bottom-24 h-4 w-4 text-[#E44F76]' />
        </div>
      </div>
    </section>
  )
}

