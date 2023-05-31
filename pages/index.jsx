import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import MoviesCollection from '../components/MoviesCollection'
import ShowsCollection from '../components/ShowsCollection'
import React from 'react'

const Home = ({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) => {
  return (
    <>
      <Head>
        <title>DESSERTS | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero info={popularMovies.slice(6)} />

      <main
        className="relative min-h-screen 
          after:absolute 
          after:inset-0 
          after:z-[-1] 
          after:bg-home 
          after:bg-cover 
          after:bg-fixed 
          after:bg-center 
          after:bg-no-repeat"
      >
        <MoviesCollection results={popularMovies} title="Popular Movies" />
        <ShowsCollection results={popularShows} title="Popular Shows" />
        <MoviesCollection results={top_ratedMovies} title="Top Rated Movies" />
        <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
        <Brands />
      </main>

      <footer
        className="inset-x-1
            bg-gray-800 p-5
             text-center
             text-lg
             text-white"
      >
        <p className="font-bold">DESSERTS@2023 All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Home

export async function getServerSideProps(context) {
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
    ),
  ])

  const [popularMovies, popularShows, top_ratedMovies, top_ratedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ])
  return {
    props: {
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  }
}
