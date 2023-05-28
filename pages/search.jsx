import React, { useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import { SearchIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import SmImg from '../components/SmImg'
import MoviesCollection from '../components/MoviesCollection'
import ShowsCollection from '../components/ShowsCollection'

const Search = ({
  apiKey,
  popularMovies,
  popularShows,
  top_ratedMovies,
  top_ratedShows,
}) => {
  const base_url = 'https://api.themoviedb.org/3'
  const [searchResults, setSearchResults] = useState([])
  const [formInputs, setFormInputs] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputs = (event) => {
    let { name, value } = event.target
    setFormInputs({ ...formInputs, [name]: value })
    setSearchTerm(event.target.value)
  }

  const search = async (event) => {
    event.preventDefault()
    let movies = await fetch(
      `${base_url}/search/movie?api_key=${apiKey}&language=en-US&query=${formInputs.searchTerm}&page=1&include_adult=false`
    )
    movies = await movies.json()

    setSearchResults(movies.results)
    console.log(searchResults)
  }

  return (
    <div>
      <Head>
        <title>DESSERTS | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section>
        {/* <div className="relative inset-0 h-screen w-screen">
          <Image
            src="/images/hero-background.jpg"
            layout="fill"
            style={{objectFit:"cover"}}
            alt="background-nf"
          />
        </div> */}

        <div className=" mt-[2rem] w-screen">
          <form
            className="mt-5 flex flex-grow flex-col
            items-center"
            action=""
            onSubmit={search}
          >
            <div
              className="lg:m-w-2xl flex w-full
              max-w-md cursor-pointer items-center
              rounded-full border-2 px-5
              py-1 shadow-gray-200 focus-within:shadow-lg 
              hover:shadow-lg hover:ring-2 focus:outline-none active:ring-gray-400 sm:max-w-xl"
            >
              <SearchIcon className="mr-3 h-8 text-gray-200" />
              <input
                type="text"
                className="flex-grow bg-black
                focus:outline-none"
                name="searchTerm"
                value={searchTerm}
                onChange={handleInputs}
                required
              />
              <button className="btn ">Search</button>
            </div>
          </form>
          <div className="m-3 text-center text-lg">
            {searchTerm
              ? `Results for "${searchTerm}"`
              : 'Type and search for ...'}
          </div>
          {searchResults !== [] ? (
            <div className="">
              <SmImg
                info={searchResults.filter((item) => item.poster_path !== null)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <div>
          <MoviesCollection results={popularMovies} title="Popular Movies" />
          <ShowsCollection results={popularShows} title="Popular Shows" />
          <MoviesCollection
            results={top_ratedMovies}
            title="Top Rated Movies"
          />
          <ShowsCollection results={top_ratedShows} title="Top Rated Shows" />
        </div>
      </section>
    </div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
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
      apiKey,
      popularMovies: popularMovies.results,
      popularShows: popularShows.results,
      top_ratedMovies: top_ratedMovies.results,
      top_ratedShows: top_ratedShows.results,
    },
  }
}
