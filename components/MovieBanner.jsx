import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
// import { FaAngleDoubleDown } from 'react-icons/fa';
// import {Link as Scroll} from 'react-scroll'
import moment from 'moment'
import {
  GlobeAltIcon,
  HeartIcon,
  PlusIcon,
  ThumbUpIcon,
} from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import Image from 'next/image'

const BASE_URL = 'https://image.tmdb.org/t/p/original'
const BASE_URL_SM = 'https://image.tmdb.org/t/p/w500'

const ShowBanner = ({ results }) => {
  const router = useRouter()

  return (
    <section className="max-w-screen-1x1 relative mt-7 shadow-2xl">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {results.map((item) => (
          <div key={item}>
            {/* ===== wrapper div with the background image  ======= */}
            <div
              className="flex h-[calc(100vh-0.5rem)] w-screen"
              style={{
                position: 'relative',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                // justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${BASE_URL}${item.backdrop_path})`,
              }}
            >
              {/* =====  poster image ======= */}
              <div
                className="item-center z-300 ml-20 
         cursor-pointer py-5"
                onClick={() => router.push(`/movie/${item.id}`)}
              >
                <Image
                  className="  rounded-md drop-shadow-lg"
                  loading="lazy"
                  width={300}
                  height={400}
                  src={`${BASE_URL_SM}${item.poster_path}`}
                  alt={item.title}
                />
              </div>
              {/*  */}
            </div>

            <div className=" absolute top-1/3 left-1/2 text-left">
              <h1
                className="
        xs:text-2xl  sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl
          "
              >
                {item.title || item.name}
              </h1>
              <h3
                className=" mt-3
        xs:text-lg  sm:text-xl md:text-xl lg:text-2xl xl:text-4xl
          "
              >
                {moment(item.release_date || item.first_air_date).format(
                  'YYYY'
                )}
              </h3>
              <div className="mt-3 flex items-center space-x-3 md:space-x-5">
                <div
                  className="flex h-11 w-11 cursor-pointer items-center justify-center
            rounded-md border-2 border-white bg-black/60"
                >
                  <PlusIcon className="h-6" />
                </div>
                <div
                  className="rounded=full flex h-11 w-20 cursor-pointer items-center
                  justify-center rounded-md border-2 border-white bg-black/60"
                >
                  <HeartIcon className="h-6 " />
                  {item.vote_count}
                </div>
                <div
                  className="rounded=full flex h-11 w-20 cursor-pointer items-center
                  justify-center rounded-md border-2 border-white bg-black/60"
                >
                  <ThumbUpIcon className="h-6" />
                  {item.vote_average}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  )
}

export default ShowBanner
