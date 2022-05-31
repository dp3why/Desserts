import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { FaAngleDoubleDown } from 'react-icons/fa';
import {Link as Scroll} from 'react-scroll'


const BASE_URL = 'https://image.tmdb.org/t/p/original';

const Slider = ({info}) => {
  // console.log(data)
  return (
    <section className='relative mt-7 shadow-2x1 max-w-screen-1x1'>  
      
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}>
        
      {info.map((item) =>
     ( <div key={item}>
       {/* gray layer to darken the image */}
       <div className='absolute inset-0 bg-gray-600 bg-opacity-50'></div>
        <div 
          className='w-screen h-screen absolute mt-20 top-20 item-center justify-center'> 
            
            <h1 className='mt-10 backdrop-hue-rotate-10 h-100% 
            text-xs:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-8xl
             text-center ' >
              The 
              <span className='text-green-400'>{` Ultimate `}</span>
               Experience
            </h1> 
            <h2 className='mt-20 h-100% 
             xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl  xl:text-4xl
             text-center uppercase' >
              Let's Enjoy !
            </h2>
            <h2 className='text-green-400 mt-10 h-100% 
            xs:text-lg sm:text-xl md:text-2xl lg:text-2xl  xl:text-3xl
            text-center ' >
              The Best Movies and TV shows
            </h2>
       
            <div className=' w-screen item-center mt-20 h-100% text-2xl text-center uppercase'>
              <Scroll to='brands' smooth={true} >
                <FaAngleDoubleDown className='w-screen cursor-pointer
                animate-bounce'/>
              </Scroll>
            </div> 
            
        </div>
        
          <img className='' loading="lazy" src={`${BASE_URL}${item.backdrop_path}`} alt={item.title} />
         
      </div>
      ))
      }
      </Carousel>
    </section>
  )
}

export default Slider