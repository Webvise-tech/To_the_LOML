import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaHeart, FaMapMarkerAlt, FaPlus, FaUsers } from 'react-icons/fa'

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

const CIRCLE_SIZE = 200
const GAP = 24
const STEP = CIRCLE_SIZE + GAP

export default function Section5({
  eyebrow = 'Our First Trip',
  title = 'Why Some Places',
  titleAccent = 'Just Click',
  block1Title = "Adventure's Heart",
  block1Description = 'The places we went together and the memories we keep. Our first trip started it all.',
  block2Title = 'Miles Together',
  block2Description = 'Every journey with you feels like home. Sed vitae malesuada sapien, integer eu sem.',
  images: imagesProp,
  image1Url,
  image2Url,
  image3Url,
}) {
  // images array: [img1, img2, img3, img4, ...]. We always show 3 at a time.
  // Right arrow: first slides left and disappears, next one enters from right → [img2, img3, img4]
  const images = Array.isArray(imagesProp) && imagesProp.length > 0
    ? imagesProp
    : [image1Url, image2Url, image3Url].filter(Boolean)
  const maxIndex = Math.max(0, images.length - 3)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Right: show next triple (first slides left off, new from right). Left: show previous triple.
  const goPrev = () => setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1))
  const goNext = () => setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1))
  const showArrows = images.length > 3

  return (
    <section className='relative overflow-hidden bg-pink-50 py-16 sm:py-24'>
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
            <p className='text-sm font-medium text-slate-500'>{eyebrow}</p>
            <h2 className='mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-[2.5rem]'>
              {title}
              <br />
              <span className='text-[#E44F76]'>{titleAccent}</span>
            </h2>
          </div>
          <div className='flex flex-col gap-8'>
            <FeatureBlock
              icon={FaMapMarkerAlt}
              title={block1Title}
              description={block1Description}
            />
            <FeatureBlock
              icon={FaUsers}
              title={block2Title}
              description={block2Description}
            />
          </div>
        </div>

        {/* Bottom: always show 3 circles. Arrows slide: right = first goes left, new from right */}
        <div className='relative flex items-center justify-center gap-4 rounded-3xl bg-pink-100/80 px-14 py-12 sm:px-16 sm:py-14'>
          <button
            type='button'
            onClick={goPrev}
            disabled={!showArrows}
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#E44F76] shadow-lg transition hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E44F76] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none'
            aria-label='Previous'
          >
            <FaChevronLeft className='h-6 w-6' />
          </button>

          <div className='overflow-hidden' style={{ width: CIRCLE_SIZE * 3 + GAP * 2 }}>
            <div
              className='flex transition-transform duration-300 ease-out'
              style={{
                transform: `translateX(-${currentIndex * STEP}px)`,
                gap: `${GAP}px`,
              }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className='shrink-0 overflow-hidden rounded-full'
                  style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
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
            className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/90 text-[#E44F76] shadow-lg transition hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#E44F76] focus:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none'
            aria-label='Next'
          >
            <FaChevronRight className='h-6 w-6' />
          </button>
        </div>
      </div>
    </section>
  )
}
