import React, { useState, useContext } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Image from 'next/image'
import {
  PlusIcon,
  XIcon,
  HeartIcon,
  ThumbUpIcon,
  GlobeAltIcon,
} from '@heroicons/react/solid'
import moment from 'moment'
import ReactPlayer from 'react-player'
import { useRouter } from 'next/router'
import SmImg from '../../components/SmImg'
import { AppContext } from '../../pages/_app'

const Movie = ({ recommendations, result }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  const [showPlayer, setShowPlayer] = useState(false)

  const index = result.videos.results.findIndex(
    (element) => element.type === 'Trailer' || element.type === 'Clip'
  )
  const router = useRouter()
  const { darkMode } = useContext(AppContext)

  return (
    <div>
      <Head>
        <title>{result.title || result.original_name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section className={`searchpage ${darkMode ? 'dark' : 'light'}`}>
        {/* === background === */}
        <div className="relative min-h-[calc(100vh-72px)]">
          <Image
            src={
              `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
              `${BASE_URL}${result.poster_path}`
            }
            fill
            style={{ objectFit: 'cover' }}
            alt=""
          />
        </div>
        {/* === gray layer to darken the image === */}
        <div className="absolute inset-0 bg-gray-600 bg-opacity-50"></div>

        {/* === main information === */}
        <div
          className="lg:inset-x-15 absolute inset-y-28
                inset-x-4 z-50 space-y-6 md:inset-y-auto md:inset-x-12 md:bottom-10"
        >
          <h1 className="text-4xl font-bold sm:text-4xl md:text-6xl">
            {result.title || result.original_name}
          </h1>
          <h3 className="text-xl">
            {moment(result.release_date || result.first_air_date).format(
              'YYYY'
            )}
          </h3>
          <div className="flex items-center space-x-3 md:space-x-5">
            {/* 
                        ==== trailer button ===
                        */}
            <button
              className="flex items-center justify-center
                        rounded bg-[#f9f9f9] py-2.5 px-6 text-xs text-black hover:bg-[#c6c6c6] 
                        md:text-base"
              onClick={() => setShowPlayer(true)}
            >
              <Image
                src="/images/play-icon-black.svg"
                alt=""
                width={20}
                height={20}
                className="h-6 md:h-8"
              />
              <span className="font-medium uppercase tracking-wide">
                Trailer
              </span>
            </button>
            {/* 
                        ==== END trailer button ===
                        */}
            <div
              className="rounded=full flex h-11 w-11 cursor-pointer items-center
                        justify-center border-2 border-white bg-black/60"
            >
              <PlusIcon className="h-6" />
            </div>
            <div
              className="rounded=full flex h-11 w-20 cursor-pointer items-center
                        justify-center border-2 border-white bg-black/60"
            >
              <HeartIcon className="h-6" />
              {result.vote_count}
            </div>
            <div
              className="rounded=full flex h-11 w-20 cursor-pointer items-center
                        justify-center border-2 border-white bg-black/60"
            >
              <ThumbUpIcon className="h-6" />
              {result.vote_average}
            </div>
          </div>
          <h4 className="text-sm md:text-lg">
            {result.genres.map((genre) => genre.name + ' | ')}
          </h4>
          <div
            className="justify-left flex h-8 
                         items-center"
          >
            <GlobeAltIcon className="mr-2 h-6 w-6" />
            <h4 className="text-sm md:text-lg">
              {result.spoken_languages.map(
                (language) => language.english_name + '  '
              )}
            </h4>
          </div>
          <h2 className="max-w-5xl text-3xl md:text-4xl">"{result.tagline}"</h2>

          <p className="max-w-4xl text-sm md:text-lg">{result.overview}</p>
        </div>

        {/* == bg overlay == */}
        {showPlayer && (
          <div
            className="inste-0 absolute z-50 
                       h-full w-full bg-black opacity-50"
          ></div>
        )}

        {/* === Outline of Player ===  */}
        <div
          className={`absolute inset-x-[7%] top-3 overflow-hidden rounded 
                       transition duration-1000 
                       md:inset-x-[13%] ${
                         showPlayer ? 'z-50 opacity-100' : 'opacity-0'
                       }`}
        >
          <div
            className="flex items-center justify-between 
                       bg-black p-3.5 text-[#f9f9f9] "
          >
            <span className="font-semibold">Play Trailer</span>

            <div
              className="flex h-8 
                                w-8 cursor-pointer items-center justify-center rounded-lg
                                opacity-50 hover:bg-[#0F0F0F] hover:opacity-75"
              onClick={() => setShowPlayer(false)}
            >
              <XIcon className="h-5" />
            </div>
          </div>
          {/* === Player ===  */}
          <div className="relative pt-[56.25%] ">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
              width="100%"
              height="100%"
              style={{ position: 'absolute', top: '0', left: '0' }}
              controls={true}
              playing={showPlayer}
            />
          </div>
        </div>
      </section>

      <div className={`searchpage ${darkMode ? 'dark' : 'light'}`}>
        <h1
          className="ml-3 p-5 text-2xl font-bold text-black 
             dark:text-white "
        >
          You May also like:
        </h1>
        <SmImg info={recommendations} />
      </div>
    </div>
  )
}

export default Movie

const base = 'https://api.themoviedb.org/3/movie/'

export async function getServerSideProps(context) {
  const { id } = context.query
  // const request = await fetch(
  //     `${base}${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
  // ).then((response) => response.json());

  const [recommendationsRes, detailRes] = await Promise.all([
    fetch(
      `${base}${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `${base}${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
    ),
  ])
  const [recommendations, detail] = await Promise.all([
    recommendationsRes.json(),
    detailRes.json(),
  ])

  return {
    props: {
      result: detail,
      recommendations: recommendations.results,
    },
  }
}
