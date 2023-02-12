import React from 'react'
import Image from 'next/image'

const brandslist = [
  'disney',
  'national-geographic',
  'pixar',
  'marvel',
  'starwars',
]

const Brands = () => {
  return (
    <section
      className="mx-auto mt-10 flex max-w-[1400px]
    flex-col items-center justify-center gap-6 px-8 lg:flex-row"
      id="brands"
    >
      {brandslist.map((item) => (
        <div key={`${item}-div`} className="brand group">
          <Image
            src={`/images/${item}.png`}
            alt={item}
            style={{ objectFit: 'cover' }}
            fill
            sizes={1}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="hidden rounded-lg object-cover group-hover:inline"
          >
            <source src={`/videos/${item}.mp4`} />
          </video>
        </div>
      ))}
    </section>
  )
}

export default Brands
