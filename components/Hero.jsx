import Image from 'next/image'
import React, { useContext } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { FaAngleDoubleDown } from 'react-icons/fa'
import { Link as Scroll } from 'react-scroll'
import { useRouter } from 'next/router'
import { AppContext } from '../pages/_app'

const BASE_URL = 'https://image.tmdb.org/t/p/original'
const BASE_URL_SM = 'https://image.tmdb.org/t/p/w500'

const Hero = ({ info }) => {
  const router = useRouter()
  const { darkMode } = useContext(AppContext)

  return (
    <section>
      {/* ========= Part 1 ========= */}
      <Carousel
        className=" h-[calc(100vh-65px)] "
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={9000}
      >
        {info.map((item) => (
          <div key={item}>
            {/* ===== bg backdrop_path image ====== */}
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
             rounded-full text-3xl backdrop-blur dark:bg-white/30 "
              >
                <Scroll to="intropage" smooth={true}>
                  <FaAngleDoubleDown
                    className=" 
                cursor-pointer"
                  />
                </Scroll>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
      {/* ======== Part 2========== */}
      <div
        id="intropage"
        className={`hero-part2 ${darkMode ? 'dark' : 'light'}`}
      >
        <div className="flex flex-col items-center justify-center px-7">
          <Image
            src="/images/logonew3.png"
            className="mx-1 rounded-full"
            width={150}
            height={150}
            alt="logo"
          />

          <h1
            className="bg-gradient-to-r from-pink-500 to-violet-500 
            bg-clip-text p-1 text-5xl font-extrabold
            text-transparent "
          >
            DESSERTS
          </h1>
          <h3
            className=" mt-1 text-center text-2xl
            font-bold text-black dark:text-white"
          >
            Sweet and Simple!
          </h3>
          <h4
            className="h-100% text-drop-shadow mt-[2rem] max-w-md text-justify
            text-lg text-violet-600 drop-shadow-lg  dark:text-violet-300 "
          >
            Just like your favorite sweet treats, each movie is a delicious
            blend of storytelling, infused with flavors of joy, excitement, and
            pure entertainment.
          </h4>
        </div>

        {/* <div className="flex items-center justify-center"></div> */}
      </div>
    </section>
  )
}

export default Hero
