import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
// import { FaAngleDoubleDown } from 'react-icons/fa';
// import {Link as Scroll} from 'react-scroll'
import moment from 'moment';
import { GlobeAltIcon, HeartIcon, PlusIcon, ThumbUpIcon } from '@heroicons/react/solid';
import {Router, useRouter} from 'next/router'
// import Image from 'next/image';

const BASE_URL = 'https://image.tmdb.org/t/p/original';

const ShowBanner = ({results}) => {
  const router = useRouter();

  return (
    <section className='relative mt-7 shadow-2xl max-w-screen-1x1'>  
      
      <Carousel
      autoPlay
      infiniteLoop
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      interval={5000}>
        
      {results.map((item) =>
     ( 
    <div key={item}>
      <div>
        {/* gray layer to darken the image */}
        <div className='absolute inset-0 bg-gray-600 bg-opacity-50'></div>   

        {/* background image */}
        <img className='' loading="lazy" 
        objectFit='cover' layout='fill'
        src={`${BASE_URL}${item.backdrop_path}`} alt={item.title} />
        {/* poster image */}
        <div className='absolute top-10 left-20 cursor-pointer
        w-1/3 item-center h-70%'  
        onClick={() => router.push(`/movie/${item.id}`)}>
          <img className='flex' objectFit='cover' layout='fill'
          loading="lazy" src={`${BASE_URL}${item.poster_path}`} 
          alt={item.title} />
        </div>   
      </div>

      <div className=' absolute top-1/3 left-1/2 text-left'> 
      
        <h1 className='
        xs:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl
          ' >
          {item.title || item.name}
        </h1> 
        <h3 className=' mt-3
        xs:text-lg  sm:text-xl md:text-xl lg:text-2xl xl:text-4xl
          ' >
           {moment(item.release_date || item.first_air_date).format('YYYY')}
        </h3> 
        <div className='flex mt-3 items-center space-x-3 md:space-x-5'>
                        
            <div className='rounded=full border-2 border-white flex items-center justify-center
            w-11 h-11 cursor-pointer bg-black/60'>
                <PlusIcon className='h-6'/>
            </div>
            <div className='rounded=full border-2 border-white flex items-center justify-center
            w-20 h-11 cursor-pointer bg-black/60'>
                <HeartIcon className='h-6'/>
                {item.vote_count}
            </div>
            <div className='rounded=full border-2 border-white flex items-center justify-center
            w-20 h-11 cursor-pointer bg-black/60'>
                <ThumbUpIcon className='h-6'/>
                {item.vote_average}
            </div>    
        </div>
       
      </div>
    </div>
      ))
      }
      </Carousel>
     
      
    </section>
  )
}

export default ShowBanner

