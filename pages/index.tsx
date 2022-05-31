import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import { getSession, useSession } from 'next-auth/react'
import Hero from '../components/Hero'
import Slider from '../components/Slider'
import Brands from '../components/Brands'
import MoviesCollection from '../components/MoviesCollection'
import ShowsCollection from '../components/ShowsCollection'

const Home: NextPage = ({ popularMovies, 
  popularShows, 
  top_ratedMovies, 
  top_ratedShows}) => {

  const { data: session } = useSession();
  console.log(session)

  return (
    <div>
      <Head>
        <title>Hooray | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {/* 
      not loggin, Hero. 
      login, slider
      */}
      {(!session) ? (<Hero info={popularMovies.slice(0, 5)}/>) : (
          <main className='relative min-h-screen 
          after:bg-home 
          after:bg-center 
          after:bg-cover 
          after:bg-no-repeat 
          after:bg-fixed 
          after:absolute 
          after:inset-0 
          after:z-[-1]'>
          
            <Slider info={popularMovies.slice(0, 5)} />
            <Brands />
            <MoviesCollection results={popularMovies} title='Popular Movies'/>
            <ShowsCollection results={popularShows} title='Popular Shows'/>
            <MoviesCollection results={top_ratedMovies} title='Top Rated Movies'/>
            <ShowsCollection results={top_ratedShows} title='Top Rated Shows'/>
          </main>
      )}
       <footer
      className="bg-gray-900
             text-lg text-white text-center
             inset-x-1
             bottom-1
             p-5">

      <p>Hooray@2022 All Rights Reserved.</p>
    </footer>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const [popularMoviesRes, 
    popularShowsRes, 
    top_ratedMoviesRes, 
    top_ratedShowsRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
    ]);
  const [popularMovies, 
    popularShows, 
    top_ratedMovies, 
    top_ratedShows] = await Promise.all([
      popularMoviesRes.json(),
      popularShowsRes.json(),
      top_ratedMoviesRes.json(),
      top_ratedShowsRes.json(),
    ]);
  return {
    props:{
      session,
      popularMovies: popularMovies.results, 
      popularShows: popularShows.results, 
      top_ratedMovies: top_ratedMovies.results, 
      top_ratedShows: top_ratedShows.results, 
    },
  };
}