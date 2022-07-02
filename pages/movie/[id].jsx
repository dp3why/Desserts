import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import { getSession, useSession } from 'next-auth/react'
import Hero from '../../components/Hero'
import Image from 'next/image'
import { PlusIcon, XIcon, HeartIcon, ThumbUpIcon, GlobeAltIcon } from '@heroicons/react/solid'
import moment from 'moment';
import ReactPlayer from 'react-player'
import {useRouter} from 'next/router'
import SmImg from '../../components/SmImg'

const Movie = ({ recommendations, result }) => {
    const { data:session } = useSession();
    const BASE_URL = 'https://image.tmdb.org/t/p/original/';
    const [showPlayer, setShowPlayer] = useState(false);

    const index = result.videos.results.findIndex(
        (element) => element.type === 'Trailer'||element.type === 'Clip'
    );
    const router = useRouter();
    
    useEffect(() => {
      if (!session) {
          router.push('/')
      }
    }, [])
    
    
    console.log(result)
    return (
    <div>
        <Head>
            <title>{result.title || result.original_name}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
       
            <section className='relative z-50'>
                {/* === background === */}
                <div className='relative min-h-[calc(100vh-72px)]'>
                    <Image src = {
            `${BASE_URL}${result.backdrop_path || result.poster_path}` || 
            `${BASE_URL}${result.poster_path}`
        } layout='fill' objectFit='cover' alt=''/>
                </div>
                 {/* === gray layer to darken the image === */}
                 <div className='absolute inset-0 bg-gray-600 bg-opacity-50'></div>

                {/* === main information === */}
                <div className='absolute inset-y-28 md:inset-y-auto
                md:bottom-10 inset-x-4 md:inset-x-12 lg:inset-x-15 space-y-6 z-50'>
                    <h1 className='text-4xl sm:text-4xl md:text-6xl font-bold'>{result.title || result.original_name}</h1>
                    <h3 className='text-xl'>
                        {moment(result.release_date || result.first_air_date).format('YYYY')}
                    </h3>
                    <div className='flex items-center space-x-3 md:space-x-5'>
                        
                        {/* 
                        ==== trailer button ===
                        */}
                        <button className='text-xs md:text-base bg-[#f9f9f9]
                        text-black flex items-center justify-center py-2.5 px-6 rounded 
                        hover:bg-[#c6c6c6]'
                        onClick={() => setShowPlayer(true)}>
                            <Image src="/images/play-icon-black.svg" alt="" width={20} height={20}
                            className='h-6 md:h-8' />
                            <span className='uppercase font-medium tracking-wide'>Trailer</span>
                        </button>
                         {/* 
                        ==== END trailer button ===
                        */}
                        <div className='rounded=full border-2 border-white flex items-center justify-center
                        w-11 h-11 cursor-pointer bg-black/60'>
                            <PlusIcon className='h-6'/>
                        </div>
                        <div className='rounded=full border-2 border-white flex items-center justify-center
                        w-20 h-11 cursor-pointer bg-black/60'>
                            <HeartIcon className='h-6'/>
                            {result.vote_count}
                        </div>
                        <div className='rounded=full border-2 border-white flex items-center justify-center
                        w-20 h-11 cursor-pointer bg-black/60'>
                            <ThumbUpIcon className='h-6'/>
                            {result.vote_average}
                        </div>
                    </div>
                   <h4 className='text-sm md:text-lg'>
                       {result.genres.map((genre) => genre.name + " | ")}
                   </h4>
                   <div className='flex items-center justify-left 
                         h-8'>
                             <GlobeAltIcon className='w-6 h-6 mr-2'/>
                             <h4 className='text-sm md:text-lg'>
                                {result.spoken_languages.map((language) => language.english_name + "  ")}
                            </h4>
                    </div>
                   <h2 className='text-3xl md:text-4xl max-w-5xl'>
                       "{result.tagline}"
                   </h2>

                   <p className='text-sm md:text-lg max-w-4xl'>
                       {result.overview}
                   </p>
                </div>


                   {/* == bg overlay == */}
                   {showPlayer && (
                       <div className='absolute inste-0 bg-black 
                       opacity-50 h-full w-full z-50'>

                    </div>
                   )}

                    {/* === Outline of Player ===  */}
                   <div className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded 
                       overflow-hidden transition 
                       duration-1000 ${showPlayer ? 'opacity-100 z-50':'opacity-0'}`}>
                       
                       <div className='flex items-center justify-between 
                       bg-black text-[#f9f9f9] p-3.5 '>
                           
                           <span className='font-semibold'>Play Trailer</span>
                            
                            <div className='cursor-pointer w-8 
                                h-8 flex justify-center items-center rounded-lg
                                opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]'
                                onClick={() => setShowPlayer(false)}>
                                
                                <XIcon className='h-5'/>
                            </div>

                        </div>
                   {/* === Player ===  */}
                   <div className='relative pt-[56.25%] '>
                        <ReactPlayer 
                        url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                        width='100%' height='100%' style={
                            {position: 'absolute', top: '0', left: '0'}
                        } controls={true} playing={showPlayer}
                        />
                    </div>
                </div>
        </section>
        <div className='m-5 p-3 w-screen '>
            <h1 className='uppercase mt-6 p-3 
            text-2xl md:text-3xl lg:text-5xl'>
                Recommendations
            </h1>
        </div>
        
        <div>
            <SmImg info={recommendations}/>
        </div>

  
    </div>
  )
}

export default Movie

const base = 'https://api.themoviedb.org/3/movie/'

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const  { id }  = context.query;
    // const request = await fetch(
    //     `${base}${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`
    // ).then((response) => response.json());

    const [recommendationsRes, detailRes] = await Promise.all([
        fetch(`${base}${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`),
        fetch( `${base}${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&append_to_response=videos`),
      ]);
    const [recommendations, detail] = await Promise.all([
          recommendationsRes.json(),
          detailRes.json(),
      ]);        

    return(
       {  props: {
        session,
        result: detail,
        recommendations: recommendations.results
        }}
    )
}
