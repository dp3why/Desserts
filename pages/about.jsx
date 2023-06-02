import React, { useContext } from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'
import { AppContext } from '../pages/_app'
import {
  CakeIcon,
  SunIcon,
  HeartIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/solid'

const About = () => {
  const { darkMode } = useContext(AppContext)
  return (
    <>
      <Head>
        <title> DESSERTS | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className={`aboutSection ${darkMode ? 'dark' : 'light'}`}>
        <div className="relative ml-4 mt-12 flex ">
          <Image
            className=""
            src="/images/logonew3.png"
            width={200}
            height={200}
          />
        </div>
        <div
          className="relative mt-8 flex h-[calc(100vh-18rem)] 
        max-w-screen-md
        flex-col"
        >
          <h1
            className=" 
            bg-gradient-to-r from-pink-500 to-violet-500 
            bg-clip-text py-1 
            text-4xl
            font-bold uppercase text-transparent
          "
          >
            Desserts:
          </h1>
          <h1
            className="my-2 text-2xl font-bold
          text-black dark:text-white
          "
          >
            Where Movies and Happiness Harmonize
          </h1>

          <h3 className=" text-neutral-700 dark:text-white">
            Movies are like desserts for us, not the main course, but a
            delightful treat that adds to our enjoyment. They don't replace a
            meal, but they're absolutely essential in their own way. Just like a
            good dessert, movies provide us with a fantastic experience that we
            can't do without. They uplift our spirits, make us laugh, cry, and
            take us on incredible journeys.
          </h3>

          <div
            className="my-6 flex w-[22rem] cursor-pointer items-center
            justify-center rounded-lg border-2
             px-2 py-2
            text-center text-base font-bold uppercase
            text-orange-500 hover:bg-neutral-500 dark:text-orange-400   "
          >
            <CakeIcon className="mx-2 h-6 w-6 " />
            Let's enjoy the show!
          </div>
        </div>

        <div
          className="mt-5 grid
            max-w-4xl grid-cols-1 items-start 
            justify-center gap-x-8 gap-y-10
           px-4 text-black dark:text-white md:grid-cols-2 md:px-8 lg:px-12 xl:px-16
            "
        >
          {textList.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
        <footer
          className="inset-x-1 min-w-full
            p-5 text-center
             text-lg text-neutral-600
             
            dark:text-white"
        >
          <p className="text-sm font-bold">
            DESSERTS@2023 All Rights Reserved.
          </p>
        </footer>
      </section>
    </>
  )
}

const textList = [
  {
    title: 'Simplified',
    icon: CheckCircleIcon,
    description:
      'Desserts is designed to simplify your search and help you find the movies and TV shows that match your taste.',
  },
  {
    title: 'User-friendly',
    icon: HeartIcon,
    description:
      "With a user-friendly interface and a powerful recommendation algorithm,you'll have access to a curated selection of shows that you're sure to love.",
  },
  {
    title: 'Personalized',
    icon: UserIcon,
    description:
      "Whether you're in the mood for a drama, comedy, or action movie, we've got you covered.",
  },
  {
    title: 'Enjoyul',
    icon: SunIcon,
    description:
      "Let's celebrate the joy of movies together, because they're truly a delightful and indispensable part of our lives! ",
  },
]

const Card = ({ title, description, icon }) => {
  const IconComponent = icon
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row">
        <IconComponent className="mr-2 h-8 w-8 text-orange-400 dark:text-orange-300" />
        <h1 className="flex flex-row text-lg">{title}</h1>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default About
