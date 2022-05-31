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
    <section className='flex flex-col md:flex-row justify-center
    items-center mt-10 gap-6 px-8 max-w-[1400px] mx-auto' id='brands'>
        { brandslist.map((item) =>  ( 
        <div  key={`${item}-div`} className='brand group' >
            <Image 
            src={`/images/${item}.png`} alt={item} 
            layout='fill' objectFit='cover'/>
            <video  
            autoPlay 
            muted loop
            playsInline controls
            className='hidden group-hover:inline rounded-lg object-cover'>
                <source src={`/videos/${item}.mp4`}/>
            </video>
        </div>))}
    </section>
  )
}

export default Brands