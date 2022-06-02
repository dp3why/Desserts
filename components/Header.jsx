import React from 'react'
import Image from 'next/image'
import { HomeIcon, SearchIcon, PlusIcon, StarIcon } from '@heroicons/react/solid'
import { signIn, signOut, useSession } from "next-auth/react"
import {useRouter} from 'next/router'

const Header = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return ( 
    <div className='sticky bg-[#040714] 
    top-0 z-[1000] 
    items-center px-10 flex 
    h-[72px] md:px-12
    '>
        <Image src='/images/logo.png' 
        className='cursor-pointer'
        width={150} height={40} alt='logo'
        onClick={ ()=> router.push('/')}
        />

{(session) ? (

  <div className='ml-10 md:flex items-center space-x-6'>
      <a className="header-link group" >
            <HomeIcon className="h-4 header-icon" />
            <span className="span header-text" onClick={ ()=> router.push('/about')}>About</span>
      </a>
      <a className="header-link group" onClick={ ()=> router.push('/search')}>
        <SearchIcon className="h-4 header-icon" />
        <span className="span header-text">Search</span>
      </a>
      <a className="header-link group">
        <PlusIcon className="h-4 header-icon" />
        <span className="span header-text ">Watchlist</span>
      </a>
      <a className="header-link group" onClick={ ()=> router.push('/movies')}>
        <img src="/images/movie-icon.svg" alt=""
        className="h-5 header-icon" />
        <span className="span header-text">Movies</span>
      </a>
      <a className="header-link group" onClick={ ()=> router.push('/tv')}>
        <img src="/images/series-icon.svg" alt=""
         className="h-5 header-icon" />
        <span className="span header-text">TV Shows</span>
      </a>
  </div>
) : (
  <div className='hidden ml-10 md:flex items-center space-x-6'>
    <a className="header-link group">
            <HomeIcon className="h-4 header-icon" />
            <span className="span header-text" onClick={ ()=> router.push('/about')}>About</span>
          </a>
          <a className="header-link group" onClick={ ()=> router.push('/movies')}>
            <img src="/images/movie-icon.svg" alt="" className="h-5 header-icon" />
            <span className="span header-text">Movies</span>
          </a>
          <a className="header-link group" onClick={ ()=> router.push('/tv')}>
            <img src="/images/series-icon.svg" alt="" className="h-5 header-icon" />
            <span className="span header-text">TV Shows</span>
          </a>
    </div>

)}

     {(!session) ? ( <button className='ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide
      hover:bg-white hover:text-black transition duration-200' 
      onClick={ ()=> router.push('/signin')
      
      } >
          Login
      </button >):
      (
        <>
          <img src={session.user.image} 
          className='ml-auto mr-2 h-12 w-12 
          rounded-full object-cover cursor-pointer bg-gray-300'  
          alt='' 
          />
          {/* <h2 className='hidden md:flex'>{session.user.name} </h2> */}
          <button className='ml-2 uppercase border px-2 py-1 
          rounded font-medium 
          tracking-wide
        hover:bg-white hover:text-black transition duration-200' 
        onClick={signOut} >
            Logout
          </button >
        </>
      )
      }
    </div>
  )
}

export default Header
