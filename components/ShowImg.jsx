import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

const BASE_URL = 'https://image.tmdb.org/t/p/original'

const ShowImg = ({ info }) => {
  const router = useRouter()

  return (
    <div className="mt-10 flex w-screen flex-wrap justify-center px-3 ">
      {info.map((item) => (
        <div
          className="m-5 flex cursor-pointer flex-col items-center justify-center"
          key={item.id}
          onClick={() => router.push(`/show/${item.id}`)}
        >
          <Image
            src={`${BASE_URL}${item.poster_path}`}
            width={330}
            height={500}
            alt="poster"
          />
          <h2 className="flex w-[330px] ">{item.title || item.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default ShowImg
