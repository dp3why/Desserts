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
    <div>
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
        <div className="relative mt-8 flex max-w-screen-md flex-col">
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
            movies are like desserts for us, not the main course, but a
            delightful treat that adds to our enjoyment. They don't replace a
            meal, but they're absolutely essential in their own way. Just like a
            good dessert, movies provide us with a fantastic experience that we
            can't do without. They uplift our spirits, make us laugh, cry, and
            take us on incredible journeys.
          </h3>
          {/* <h2 className="my-3 text-xl uppercase text-yellow-500 dark:text-yellow-300 ">
            Start discovering your next favorite movie today!
          </h2> */}
        </div>

        <div
          className="grid grid-cols-2 items-start justify-center
           gap-6 px-8 text-black dark:text-white
          xl:grid-cols-4 "
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
      </section>
    </div>
  )
}

const textList = [
  {
    title: 'Simplify',
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
    <div className="flex flex-col">
      <IconComponent className="mr-2 h-8 w-8 text-orange-600" />
      <h1 className="flex flex-row text-lg">{title}</h1>
      <p className="text-sm">{description}</p>
    </div>
  )
}

export default About
