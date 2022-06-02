import React from 'react'
import { getProviders, getSession, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <div className='flex items-center justify-center w-screen h-screen
    relative'>
      <img className='h-full w-full object-cover' 
      src="/images/hero-background.jpg" alt="" />

      <div className='absolute w-full h-full inset-0 
      flex flex-col items-center justify-center'>

      {Object.values(providers).map((provider) => (
        <div className='btn' key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
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