import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { Link as Scroll } from 'react-scroll'

const BASE_URL = 'https://image.tmdb.org/t/p/original'

const Slider = ({ info }) => {
  // console.log(data)
  return (
    <section className="shadow-2x1 max-w-screen-1x1 relative mt-2">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {info.map((item) => (
          <div key={item}>
            {/* gray layer to darken the image */}
            <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>
            <div className="item-center absolute top-10 mt-10 h-screen w-screen justify-center">
              <h1
                className="backdrop-hue-rotate-10 h-100% text-xs:text-2xl 
            mt-10  text-center sm:text-3xl md:text-4xl lg:text-5xl
             xl:text-8xl "
              >
                The
                <span className="text-green-400">{` Ultimate `}</span>
                Experience
              </h1>
              <h2
                className="h-100% mt-20 
             text-center uppercase xs:text-xl sm:text-2xl  md:text-3xl
             lg:text-4xl xl:text-4xl"
              >
                Let's Enjoy !
              </h2>
              <h2
                className="h-100% mt-10 text-center 
            text-green-400 xs:text-lg sm:text-xl md:text-2xl  lg:text-2xl
            xl:text-3xl "
              >
                The Best Movies and TV shows
              </h2>

              <div className=" item-center h-100% mt-20 w-screen text-center text-2xl uppercase">
                <Scroll to="brands" smooth={true}>
                  <FaAngleDoubleDown
                    className="w-screen animate-bounce
                cursor-pointer"
                  />
                </Scroll>
              </div>
            </div>

            <img
              className=""
              loading="lazy"
              src={`${BASE_URL}${item.backdrop_path}`}
              alt={item.title}
            />
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default Slider
