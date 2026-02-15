import React from 'react'
import { FaHeart, FaStar } from 'react-icons/fa'

function CircleImage({ src, alt = '', sizeClassName }) {
  return (
    <div
      className={`relative overflow-hidden rounded-full bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] ring-4 ring-white ${sizeClassName}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className='h-full w-full object-cover'
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

function Stat({ value, body }) {
  return (
    <div>
      <div className='text-2xl font-extrabold tracking-tight text-[#E44F76] sm:text-3xl'>
        {value}
      </div>
      <div className='mt-2 max-w-[220px] text-sm leading-5 text-slate-500'>
        {body}
      </div>
    </div>
  )
}

export default function Section3({
  eyebrow = 'The Heartbeat of a Great Deck',
  title = 'Falling In Love With',
  titleAccent = 'Your Message',
  body = 'Cupiditate non proident, sed quia amor movet animos et creat memoriam. Duis aute irure dolor in reprehenderit',
  statLeftValue = '+589',
  statLeftBody = 'Cupiditate non proident, sed quia amor movet',
  statRightValue = '+8,000',
  statRightBody = 'Cupiditate non proident, sed quia amor movet',
  bigCircleImageUrl,
}) {
  return (
    <section className='relative overflow-hidden bg-pink-50 py-16 sm:py-24'>
      {/* Stars: top-left and top-right */}
      <FaStar className='pointer-events-none absolute left-8 top-8 h-5 w-5 text-[#E44F76]' />
      <FaStar className='pointer-events-none absolute right-8 top-8 h-5 w-5 text-[#E44F76]' />
      {/* Heart: to the left of the circular image */}
      <FaHeart className='pointer-events-none absolute left-8 top-36 h-8 w-8 text-[#E44F76] float-heart md:left-12 md:top-40' />
      {/* Heart: centrally between left and right content */}
      <FaHeart className='pointer-events-none absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-[#E44F76] float-heart-slow float-heart-delay' />

      <div className='mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-12'>
        {/* Left: single circle */}
        <div className='flex flex-col items-center'>
          <CircleImage
            src={bigCircleImageUrl}
            alt='Couple'
            sizeClassName='h-[300px] w-[300px] sm:h-[360px] sm:w-[360px] md:h-[380px] md:w-[380px]'
          />
        </div>

        {/* Right: text + stats */}
        <div className='flex flex-col justify-center pt-2'>
          <p className='text-sm font-medium text-slate-500'>{eyebrow}</p>
          <h2 className='mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]'>
            {title}
            <br />
            <span className='text-[#E44F76]'>{titleAccent}</span>
          </h2>
          <p className='mt-6 max-w-xl text-sm leading-7 text-slate-500 sm:text-base'>
            {body}
          </p>
          <div className='mt-10 flex flex-wrap gap-x-12 gap-y-8'>
            <Stat value={statLeftValue} body={statLeftBody} />
            <Stat value={statRightValue} body={statRightBody} />
          </div>
        </div>
      </div>
    </section>
  )
}
