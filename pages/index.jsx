import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Brands from '../components/Brands'
import MoviesCollection from '../components/MoviesCollection'
import ShowsCollection from '../components/ShowsCollection'
import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { getAuth } from 'firebase/auth'

const Home = ({
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) => {
  const auth = getAuth()
  const checkTokenExpiration = () => {
    const idToken = localStorage.getItem('idToken')
    if (idToken) {
      const decodedToken = jwtDecode(idToken)
      const expirationTime = decodedToken.exp * 1000 // Convert expiration time to milliseconds

      // Check if the token has expired
      if (expirationTime < Date.now()) {
        // Token has expired, sign out the user
        localStorage.removeItem('idToken')
        localStorage.removeItem('accessToken')
        auth.signOut() // Sign out from Firebase authentication

        // Redirect to the sign-in page or any other desired action
        // router.push('/signin')
      }
    }
  }

  // Call the expiration check on component mount
  useEffect(() => {
    checkTokenExpiration()
  }, [])

  return (
    <>
      <Head>
        <title>DESSERTS | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero info={popularMovies.slice(0, 6)} />

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
        <p className="text-sm font-bold">DESSERTS@2023 All Rights Reserved.</p>
      </footer>
    </>
  )
}

export default Home

export async function getServerSideProps(context) {
  const base_url = 'https://api.themoviedb.org/3'
  const [
    popularMoviesRes,
    popularShowsRes,
    top_ratedMoviesRes,
    top_ratedShowsRes,
  ] = await Promise.all([
    fetch(
      `${base_url}/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=28&include_adult=false&language=en-US&page=1`
    ),
    fetch(
      `${base_url}/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&page=1`
    ),
    fetch(
      `${base_url}/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&page=1`
    ),
    fetch(
      `${base_url}/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&include_adult=false&language=en-US&page=1`
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
