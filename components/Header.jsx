import React from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  SearchIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/solid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { initFirebase } from '../firebase'

initFirebase()

const Header = () => {
  const router = useRouter()

  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  return (
    <div
      className=" sticky top-0
    z-[1000] flex h-[72px]
    items-center justify-between  bg-gradient-to-b from-black to-[rgb(0,0,0,0.3)]
    px-10 md:px-12
    "
    >
      <div
        className="flex cursor-pointer flex-row items-center justify-center gap-0"
        onClick={() => router.push('/')}
      >
        <Image
          src="/images/logonew.png"
          className="mx-1 rounded-full"
          width={40}
          height={40}
          alt="logo"
        />
        <h1 className="mx-1 text-lg font-bold">NEFLE</h1>
      </div>
      <div className="ml-10 items-center space-x-6 md:flex">
        <a className="header-link group">
          <HomeIcon className="header-icon h-4" />
          <span
            className="span header-text"
            onClick={() => router.push('/about')}
          >
            About
          </span>
        </a>
        <a className="header-link group" onClick={() => router.push('/search')}>
          <SearchIcon className="header-icon h-4" />
          <span className="span header-text">Search</span>
        </a>

        <a className="header-link group" onClick={() => router.push('/movies')}>
          <img
            src="/images/movie-icon.svg"
            alt=""
            className="header-icon h-5"
          />
          <span className="span header-text">Movies</span>
        </a>
        <a className="header-link group" onClick={() => router.push('/tv')}>
          <img
            src="/images/series-icon.svg"
            alt=""
            className="header-icon h-5"
          />
          <span className="span header-text">TV Shows</span>
        </a>
        {/* ======== Header links after login */}
        {user ? (
          <a className="header-link group">
            <StarIcon className="header-icon h-5" />
            <span className="span header-text ">Watchlist</span>
          </a>
        ) : (
          <></>
        )}
      </div>
      <div className=" flex flex-row justify-end">
        {!user ? (
          <button
            className="ml-auto rounded-md border px-4 py-1.5 font-medium uppercase tracking-wide
      transition duration-200 hover:bg-white hover:text-black"
            onClick={() => router.push('/signin')}
          >
            Login
          </button>
        ) : (
          <div className="mr-1 ml-20 flex w-full items-center justify-end">
            <button
              className=" h-8 w-8
          cursor-pointer rounded-full bg-green-600 object-cover"
            >
              {' '}
              {user.displayName[0]}
            </button>

            {/* <h2 className='hidden md:flex'>{session.user.name} </h2> */}
            <button
              className="ml-2 rounded border px-2 py-1 
           uppercase 
          tracking-wide
        transition duration-200 hover:bg-white hover:text-black"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Header
