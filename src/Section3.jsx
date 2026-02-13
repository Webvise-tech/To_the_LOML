import React from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'

function CircleImage({ src, alt = '', sizeClassName }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-white/60 shadow-[0_18px_45px_rgba(0,0,0,0.10)] ring-8 ring-white ${sizeClassName}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className='h-full w-full object-cover'
          loading='lazy'
        />
      ) : (
        <div className='h-full w-full bg-gradient-to-br from-pink-200 to-pink-400' />
      )}
    </div>
  )
}

function PercentBadge({ value, className = '' }) {
  return (
    <div
      className={`grid h-16 w-16 place-items-center rounded-full bg-[#E44F76] text-lg font-semibold text-white shadow-[0_18px_45px_rgba(0,0,0,0.12)] ${className}`}
    >
      {value}%
    </div>
  )
}

function Stat({ value, body }) {
  return (
    <div>
      <div className='text-3xl font-extrabold tracking-tight text-[#E44F76] sm:text-4xl'>
        {value}
      </div>
      <div className='mt-3 max-w-xs text-sm leading-6 text-slate-500'>{body}</div>
    </div>
  )
}

export default function Section3({
  eyebrow = 'The Heartbeat of a Great Deck',
  title = 'Falling In Love With',
  titleAccent = 'Your Message',
  body = 'Cupiditate nonproident, sed quia amor movet animos et creat memoriam. Duis aute irure dolor in reprehenderit in.',
  statLeftValue = '+589',
  statLeftBody = 'Cupiditate nonproident, sed quia amor movet',
  statRightValue = '+8,000',
  statRightBody = 'Cupiditate nonproident, sed quia amor movet',
  bigCircleImageUrl,
  smallCircleImageUrl,
  bigPercent = 90,
  smallPercent = 87,
}) {
  return (
    <section className='relative overflow-hidden bg-pink-50 py-16 sm:py-24'>
      {/* decorative bits */}
      <FaStar className='pointer-events-none absolute left-1/2 top-10 h-4 w-4 -translate-x-1/2 text-[#E44F76]' />
      <FaStar className='pointer-events-none absolute right-24 top-12 h-4 w-4 text-[#E44F76]' />
      <FaStar className='pointer-events-none absolute left-32 bottom-12 h-4 w-4 text-[#E44F76]' />
      <FaHeart className='pointer-events-none absolute left-12 top-24 h-9 w-9 text-[#E44F76] float-heart' />
      <FaHeart className='pointer-events-none absolute left-1/2 top-44 h-7 w-7 -translate-x-1/2 text-[#E44F76] float-heart-slow float-heart-delay' />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2'>
        {/* left visuals */}
        <div className='relative mx-auto w-full max-w-lg'>
          <div className='relative'>
            <CircleImage
              src={bigCircleImageUrl}
              alt='Photo'
              sizeClassName='h-[260px] w-[260px] sm:h-[300px] sm:w-[300px]'
            />

            <PercentBadge value={bigPercent} className='absolute -left-8 top-1/2 -translate-y-1/2' />

            <div className='absolute -bottom-14 left-24 sm:left-28'>
              <CircleImage
                src={smallCircleImageUrl}
                alt='Photo'
                sizeClassName='h-[170px] w-[170px] sm:h-[190px] sm:w-[190px]'
              />
              <PercentBadge
                value={smallPercent}
                className='absolute -right-8 top-1/2 -translate-y-1/2'
              />
            </div>
          </div>
        </div>

        {/* right content */}
        <div>
          <div className='text-sm font-medium text-slate-400'>{eyebrow}</div>

          <h2 className='mt-5 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl'>
            {title}
            <br />
            <span className='text-[#E44F76]'>{titleAccent}</span>
          </h2>

          <p className='mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base'>
            {body}
          </p>

          <div className='mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2'>
            <Stat value={statLeftValue} body={statLeftBody} />
            <Stat value={statRightValue} body={statRightBody} />
          </div>
        </div>
      </div>
    </section>
  )
}

