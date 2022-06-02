import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import MovieBanner from '../components/MovieBanner'
import SmImg from '../components/SmImg'


const movies = ({ popularMovies, 
  popularShows, 
  actionMovies, 
  romanceMovies}) => {
  console.log(romanceMovies)
  return (
    <div>
      <Head>
        <title>Hooray | Moives</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Header />
        <main className='relative min-h-screen 
          after:bg-home 
          after:bg-center 
          after:bg-cover 
          after:bg-no-repeat 
          after:bg-fixed 
          after:absolute 
          after:inset-0 
          after:z-[-1]'>
          
            <MovieBanner results={actionMovies.slice(0, 5)} />
            <SmImg info = {actionMovies.slice(5, 11)}/>
          </main>
         


    </div>
  )
}

export default movies


export async function getServerSideProps(context) {
  const base_url = 'https://api.themoviedb.org/3'
  const session = await getSession(context);
  const [popularMoviesRes, 
    popularShowsRes, 
    actionMoviesRes, 
    romanceMoviesRes] = await Promise.all([
      fetch(`${base_url}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`${base_url}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`${base_url}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`),
      fetch(`${base_url}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`),
    ]);
  const [popularMovies, 
    popularShows, 
    actionMovies, 
    romanceMovies] = await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      actionMoviesRes.json(),
      romanceMoviesRes.json(),
    ]);
  return {
    props:{
      session,
      popularMovies: popularMovies.results, 
      popularShows: popularShows.results, 
      actionMovies: actionMovies.results, 
      romanceMovies: romanceMovies.results, 
    },
  };
}