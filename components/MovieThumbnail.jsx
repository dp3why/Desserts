import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const MovieThumbnail = ({ result }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/original/'
  const router = useRouter()

  return (
    <div>
      <div
        className="rouned-lg
    flex 
    min-h-[170px] 
    min-w-[250px] 
    transform
    cursor-pointer overflow-hidden
    border-opacity-10 shadow-xl
     transition duration-300 
    hover:scale-105 
    hover:shadow-2xl md:min-h-[210px] md:min-w-[330px]"
        onClick={() => router.push(`/movie/${result.id}`)}
      >
        <Image
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}`
          }
          width={330}
          height={210}
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
          alt=""
        />
      </div>
      <h2 className="text-center text-lg">{result.title}</h2>
    </div>
  )
}

export default MovieThumbnail
