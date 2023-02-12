import Image from 'next/image'
// import Head from 'next/head'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { Link as Scroll } from 'react-scroll'
import { useRouter } from 'next/router'

const BASE_URL = 'https://image.tmdb.org/t/p/original'
const BASE_URL_SM = 'https://image.tmdb.org/t/p/w500'
const Hero = ({ info }) => {
  const router = useRouter()

  return (
    <section>
      {/* <Head>
        <title> NEFLE </title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* ========= Part 1 ========= */}
      <Carousel
        className="z-20 h-[calc(100vh-65px)] "
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={9000}
      >
        {info.map((item) => (
          <div key={item}>
            {/* === gray layer to darken the image === */}
            {/* <div className="absolute inset-0 z-20 bg-gray-600 bg-opacity-30"></div> */}
            {/* ===== bg image ====== */}
            <div
              className=" mt-0 flex h-[calc(100vh-0.5rem)] w-screen "
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
              {/* ===== Poster image ======= */}
              <div
                className="absolute left-[8rem] right-auto top-[7rem] z-30 flex h-[25rem] 
              w-[15rem] cursor-pointer flex-col items-center justify-center rounded-3xl
               "
                onClick={() => router.push(`/movie/${item.id}`)}
              >
                <Image
                  className="z-30 mt-3 rounded-xl drop-shadow-xl	"
                  loading="lazy"
                  src={`${BASE_URL_SM}${item.poster_path}`}
                  alt={item.title}
                  fill
                  sizes="1"
                />
              </div>

              <div
                className=" absolute bottom-[4rem] left-1/2 right-1/2 flex h-[3rem] w-[3rem] animate-bounce items-center justify-center
             rounded-full bg-white/30 text-3xl backdrop-blur "
              >
                <Scroll to="intropage" smooth={true}>
                  <FaAngleDoubleDown
                    className=" 
                cursor-pointer"
                  />
                </Scroll>
              </div>
              <div
                className="z-500 absolute bottom-0 h-[3rem]  
              w-screen bg-gradient-to-b from-[rgb(0,0,0,0.1)] to-black
              "
              ></div>
            </div>
          </div>
        ))}
      </Carousel>
      {/* ======== Part 2========== */}
      <div className="relative  z-0 flex h-[calc(100vh-10px)] flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {' '}
          <h1
            className="	mt-[3rem]  bg-gradient-to-r from-pink-500 
            to-violet-500 bg-clip-text text-5xl font-extrabold text-yellow-400
            text-transparent "
            id="intropage"
          >
            NO IDEA
          </h1>
          <h3
            className=" mt-1 text-center
            text-xl font-bold"
          >
            What to watch tonight?
          </h3>
          <h2
            className="h-100% text-drop-shadow mt-[2rem] text-center 
            text-2xl text-violet-300 drop-shadow-lg"
          >
            Ask NEFLE for help!
          </h2>
        </div>

        <div className="flex items-center justify-center"></div>
      </div>
    </section>
  )
}

export default Hero
