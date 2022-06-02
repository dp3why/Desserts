import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import ShowBanner from '../components/ShowBanner'
import ShowImg from '../components/ShowImg'


const TV = ({ netflixShows, 
  popularShows, 
  actionMovies, 
  romanceMoives}) => {
    console.log(netflixShows)

  return (
    <div> 
      <Head>
        <title>Hooray | TV Shows</title>
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
          
          <ShowBanner results={netflixShows.slice(0, 5)} />
          <ShowImg info = {netflixShows.slice(5, 11)}/>
      </main>

    </div>
  )
}

export default TV


export async function getServerSideProps(context) {
  const base_url = 'https://api.themoviedb.org/3'
  const session = await getSession(context);
  const [netflixShowsRes, 
    popularShowsRes, 
    actionMRes, 
    romanceMRes] = await Promise.all([
      fetch(`${base_url}/discover/tv?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_networks=213&sort_by=popularity.desc`),
      fetch(`${base_url}/tv/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`${base_url}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28`),
      fetch(`${base_url}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=10749`),
    ]);
  const [netflixShows, 
    popularShows, 
    actionMovies, 
    romanceMovies] = await Promise.all([
      netflixShowsRes.json(),
      popularShowsRes.json(),
      actionMRes.json(),
      romanceMRes.json(),
    ]);
  return {
    props:{
      session,
      netflixShows: netflixShows.results, 
      popularShows: popularShows.results, 
      actionMovies: actionMovies.results, 
      romanceMovies: romanceMovies.results, 
    },
  };
}