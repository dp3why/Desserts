import React from 'react'
import Image from 'next/image'
import { getProviders, getSession, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  const logos = [
    { 'name': 'Google',
    'image' : '/images/google.png'}, 
    { 'name': 'GitHub',
    'image': '/images/github.png'}
  ]
  const fetchimg = (provider) => {

    let res = logos.filter( (item) => item.name === provider ).map((aaa) => aaa.image)
    // console.log(res[0])
    return res[0]
  }

  return (
    <div className='flex items-center justify-center w-screen h-screen
    relative'>
      <img className='h-full w-full object-cover' 
      src="/images/hero-background.jpg" alt="" />

      <div className='absolute w-full h-full inset-0 
      flex flex-col items-center justify-center'>
      <Image src='/images/logo.png' 
        className=''
        width={350} height={110} alt='logo'
        />
      <h1 className='m-7 text-lg uppercase'></h1>
      {Object.values(providers).map((provider) => (
        <div className='btn p-3 m-1 flex flex-row bg-gray-600' key={provider.name}>
         
          <button className='flex w-full' onClick={() => signIn(provider.id)}>
          <img src={fetchimg(provider.name)} alt="" className="mr-3 rounded-full bg-white" width={30} height={20}/>

            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {req, res} = context
  const providers = await getProviders()
  const session = await getSession({req})
  if (session && res) {
    res.statusCode = 302
    res.setHeader('Location', '/')
  }
  return {
    props: { 
      session, 
      providers },
  }
}