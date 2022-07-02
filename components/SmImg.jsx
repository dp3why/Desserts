import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

const BASE_URL = 'https://image.tmdb.org/t/p/w500'

const SmImg = ({ info }) => {
  const router = useRouter()

  return (
    <div
      className="top-[-70px] my-8 flex w-screen flex-wrap 
    justify-center px-3 "
    >
      {info.map((item) => (
        <div
          className="m-5 flex cursor-pointer flex-col items-center"
          key={item.id}
          onClick={() => router.push(`/movie/${item.id}`)}
        >
          <Image
            src={`${BASE_URL}${item.poster_path}`}
            width={330}
            height={500}
            alt="poster"
          />
          <h2 className="flex ">{item.title || item.name}</h2>
          <h3 className="flex ">
            {moment(item.release_date || item.first_air_date).format('YYYY')}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default SmImg
