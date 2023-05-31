import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

const BASE_URL = 'https://image.tmdb.org/t/p/w500'

const SmImg = ({ info }) => {
  const router = useRouter()

  return (
    <div
      className="  flex w-screen flex-wrap justify-center py-8 px-3
    text-black dark:text-white "
    >
      {info.map((item) => (
        <div
          className="m-5 flex cursor-pointer flex-col items-center"
          key={item.id}
          onClick={() => router.push(`/movie/${item.id}`)}
        >
          <Image
            src={`${BASE_URL}${item.poster_path}`}
            width={350}
            height={480}
            alt="poster"
          />
          <h2 className="flex max-w-xs text-center ">
            {item.title || item.name}
          </h2>
          <h3 className="flex ">
            {moment(item.release_date || item.first_air_date).format('YYYY')}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default SmImg
