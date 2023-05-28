import React from 'react'
import Header from '../components/Header'
import Head from 'next/head'
import Image from 'next/image'

const About = () => {
  return (
    <div>
      <Head>
        <title> DESSERTS | About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section
        className="flex w-screen flex-wrap 
      items-center justify-center gap-5"
      >
        <div className="relative ml-[1.5rem] mt-[3rem] flex ">
          <Image className="" src="/images/avar.png" width={600} height={400} />
        </div>
        <div className="relative mt-[1rem] flex max-w-screen-md flex-col">
          <h1 className="mb-[1rem] text-3xl font-bold">Desserts FOR YOU</h1>
          <h2 className="my-3 text-xl text-yellow-300">
            Are you tired of scrolling through endless lists on streaming
            platforms, trying to find the perfect movie to watch?{' '}
          </h2>
          <h3 className="">
            Desserts is designed to simplify your search and help you find the
            movies and TV shows that match your taste. With a user-friendly
            interface and a powerful recommendation algorithm, you'll have
            access to a curated selection of shows that you're sure to love.
            Whether you're in the mood for a drama, comedy, or action movie,
            we've got you covered.
          </h3>
          <h2 className="my-3 text-xl uppercase text-yellow-300">
            Start discovering your next favorite movie today!
          </h2>
        </div>
      </section>
    </div>
  )
}

export default About
