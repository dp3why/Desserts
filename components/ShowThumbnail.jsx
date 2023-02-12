import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const ShowThumbnail = ({ result }) => {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500/'
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
     shadow-xl
     transition duration-300 
    hover:scale-105 
    hover:border-opacity-80
    hover:shadow-2xl md:min-h-[210px] md:min-w-[330px]"
        onClick={() => router.push(`/show/${result.id}`)}
      >
        <Image
          width={330}
          height={210}
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
          alt=""
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}`
          }
        />
      </div>
      <h2 className="text-center text-lg">{result.name}</h2>
    </div>
  )
}

export default ShowThumbnail
