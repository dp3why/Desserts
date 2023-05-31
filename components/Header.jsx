import React, { useContext } from 'react'
import Image from 'next/image'
import {
  HomeIcon,
  SearchIcon,
  StarIcon,
  MoonIcon,
  FilmIcon,
  DesktopComputerIcon,
  // UserIcon,
  MenuIcon,
} from '@heroicons/react/solid'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import { initFirebase } from '../firebase'
import { AppContext } from '../pages/_app'

initFirebase()

const Header = () => {
  const router = useRouter()

  const { darkMode, setDarkMode } = useContext(AppContext)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const auth = getAuth()
  const [user, loading] = useAuthState(auth)
  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    auth.signOut()
  }
  return (
    <div
      className={`sticky top-0
    z-[1000] flex h-[72px]
    items-center justify-between bg-[rgba(221,96,10,0.7)]
    px-10 dark:bg-gradient-to-b dark:from-black dark:to-[rgb(0,0,0,0.3)] md:px-12
     ${darkMode ? 'dark' : ''}`}
    >
      <div
        className="flex cursor-pointer flex-row items-center justify-center gap-0"
        onClick={() => router.push('/')}
      >
        <Image
          src="/images/logonew3.png"
          className="mx-1 rounded-full"
          width={40}
          height={40}
          alt="logo"
        />
        <h1 className="mx-1 text-lg font-bold">DESSERTS</h1>
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
          <FilmIcon className="header-icon h-4" />

          <span className="span header-text">Movies</span>
        </a>
        <a className="header-link group" onClick={() => router.push('/tv')}>
          <DesktopComputerIcon className="header-icon h-4" />
          <span className="span header-text">Shows</span>
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
      <div className="ml-3 flex items-center justify-end">
        <MoonIcon
          className="header-icon mx-1 block h-6 w-6 cursor-pointer"
          onClick={toggleDarkMode}
        />
        {!user ? (
          <button
            className="ml-auto rounded-md border px-2 py-1 font-medium uppercase tracking-wide
      transition duration-200 hover:bg-white hover:text-black"
            onClick={() => router.push('/signin')}
          >
            Login
          </button>
        ) : (
          <div className=" flex items-center  justify-end gap-2">
            <button
              className=" h-8 w-8
          cursor-pointer rounded-full bg-green-600 object-cover"
            >
              {user.displayName[0]}
            </button>

            {/* <h2 className='hidden md:flex'>{session.user.name} </h2> */}

            <button
              className="ml-2 hidden rounded border px-2 
           py-1 text-sm
          uppercase tracking-wide transition
        duration-200 hover:bg-white hover:text-black sm:block"
              onClick={() => handleSignOut()}
            >
              Logout
            </button>
          </div>
        )}
        <MenuIcon className="mx-1 block w-8 md:hidden" />
      </div>
    </div>
  )
}

export default Header
