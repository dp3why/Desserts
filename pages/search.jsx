import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import {SearchIcon} from '@heroicons/react/outline'
import Image from 'next/image'
import { getSession } from 'next-auth/react'
import SmImg from '../components/SmImg'


const Search = ({ apiKey }) => {

  const base_url = 'https://api.themoviedb.org/3'
  const [searchResults, setSearchResults ] = useState([]);
  const [formInputs, setFormInputs] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputs = (event) => {
    let {name, value} = event.target
    setFormInputs({...formInputs, [name]: value });
    setSearchTerm(event.target.value)

}
  
  const search = async (event) => {
    
    event.preventDefault()
    let movies = await fetch(
          `${base_url}/search/movie?api_key=${apiKey}&language=en-US&query=${formInputs.searchTerm}&page=1&include_adult=false`
        );
    movies = await movies.json()

    setSearchResults(movies.results)
  }


  return (
    <div>
     <Head>
        <title>Hooray | Search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

      <main>
          <div className='inset-0 relative w-screen h-screen'>
            <Image
                src="/images/hero-background.jpg"
                layout="fill"
                objectFit="cover" alt='background-nf'
            />
          </div>

          <div className='absolute top-[10%] w-screen'>
            <form className='flex flex-col items-center mt-5
            flex-grow' action="" onSubmit={search}>
              <div className='flex w-full cursor-pointer
              hover:shadow-lg focus-within:shadow-lg shadow-gray-200
              hover:ring-2 focus:outline-none active:ring-gray-400
              max-w-md rounded-full border-2 
              px-5 py-1 items-center sm:max-w-xl lg:m-w-2xl'>
                <SearchIcon className='h-8 mr-3 text-gray-200'/>
                <input type='text' className='flex-grow focus:outline-none
                bg-black' name='searchTerm'  value={searchTerm}
                onChange={handleInputs} 
                required
                />
                <button className='btn '>
                  Search
                </button>
              </div>

            </form>
          
       {searchResults? 
            (<div className=''>
                <SmImg info = {searchResults.filter( (item) => item.poster_path !== null )}/>
            </div>) :( <></>)
           }
          </div>

      </main>
    </div>
  )
}



export default Search

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const apiKey = process.env.TMDB_API_KEY;

  return {
    props:{
      session,
      apiKey,
    },
  };
}