import Image from 'next/image'
import React from 'react'
import {useRouter} from 'next/router'

const BASE_URL = 'https://image.tmdb.org/t/p/w500';

const SmImg = ({info}) => {
    const router = useRouter(); 
    
    return (
    <div className='w-screen top-[-70px] px-3 my-8 flex 
    flex-wrap justify-center '>
       {info.map((item) => (
        <div className='flex m-5 cursor-pointer' key={item.id} 
        onClick={() => router.push(`/movie/${item.id}`)}>
            <img src={`${BASE_URL}${item.poster_path}` } 
            width={330} height={500} alt='poster'
            />
        </div>
    )
        )}
        
    </div>
  )
}

export default SmImg