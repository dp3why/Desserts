import Image from 'next/image'
import Head from 'next/head'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { FaAngleDoubleDown } from 'react-icons/fa';
import {Link as Scroll} from 'react-scroll'


const BASE_URL = 'https://image.tmdb.org/t/p/original';

const Hero = ({info}) => {
  return (
    <section>
      <Head>
        <title> Start | Hooray </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}>
        
      {info.map((item) =>
     ( <div key={item}>
       {/* === gray layer to darken the image === */}
       <div className='absolute inset-0 bg-gray-600 bg-opacity-50'></div>
        <div 
          className='w-screen h-screen absolute 
          mt-1/2  top-1/3
           item-center justify-center'> 
            
            <h1 className='mt-10 backdrop-hue-rotate-10 h-100% 
            xs:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl
            text text-center ' >
              The 
              <span className='text-green-400'>{` Ultimate `}</span>
               Experience
            </h1> 
            <h2 className='mt-10 h-100% 
            xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl  xl:text-4xl
            text-center uppercase' >
              Find your Best 
            </h2>
            <h2 className='text-green-400 mt-5 xs:mt-2 h-100% 
            xs:text-lg sm:text-xl md:text-2xl lg:text-2xl  xl:text-3xl
            text-center ' >
              Movies and TV Shows
            </h2>
       
            <div className=' w-screen item-center mt-10 mb-10 h-100% text-2xl text-center uppercase'>
              <Scroll to='intropage' smooth={true} >
                <FaAngleDoubleDown className='w-screen cursor-pointer
                animate-bounce'/>
              </Scroll>
            </div> 
            
             
        </div>
        
          <img className='' loading="lazy" src={`${BASE_URL}${item.backdrop_path}`} alt={item.title} layout='fill'/>
         
      </div>
      ))
      }
      </Carousel>
      
      <div className="relative min-h-[calc(100vh-72px)]" >
        <Image
          src="/images/hero-background.jpg"
          layout="fill"
          objectFit="cover"
          alt='bg-image'
        />
        <div className="flex justify-center items-center" id='intropage'>
        <div className="absolute flex flex-col space-y-5 top-1/4 w-full justify-center items-center max-w-screen-sm mx-auto p-8 -mt-16">
          <Image
            src="/images/cta-logo-one.svg"
            width="600"
            height="150"
            objectFit="contain"
            alt=''
          />
          <button 
          className="bg-blue-600 uppercase text-xl 
          tracking-wide 
          font-extrabold py-4 px-6 w-full rounded hover:bg-[#0485ee]">
            Get all there
          </button>
          <p className="text-xs text-center ">
            Get Premier Access to Raya and the Last Dragon for an additional fee
            with a Disney+ subscription. As of 03/26/21, the price of Disney+
            and The Disney Bundle will increase by $
          </p>
          <Image
            src="/images/cta-logo-two.png"
            width="600"
            height="70"
            objectFit="contain"
            alt=''
          />
        </div>
      </div>
      </div>
      
    </section>
  )
}

export default Hero