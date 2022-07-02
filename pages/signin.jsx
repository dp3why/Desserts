import React, { useEffect } from 'react'
import Image from 'next/image'
import { getProviders, getSession, useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function SignIn({ providers }) {
  const { data: session } = useSession()
  const router = useRouter()

  const logos = [
    { name: 'Google', image: '/images/google.png' },
    { name: 'GitHub', image: '/images/github.png' },
  ]
  const fetchimg = (provider) => {
    let res = logos
      .filter((item) => item.name === provider)
      .map((aaa) => aaa.image)
    // console.log(res[0])
    return res[0]
  }

  useEffect(() => {
    if (session) {
      router.push('/')
    }
  }, [session])

  return (
    <div
      className="relative flex h-screen w-screen items-center
    justify-center"
    >
      <img
        className="h-full w-full object-cover"
        src="/images/hero-background.jpg"
        alt=""
      />

      <div
        className="absolute inset-0 flex h-full 
      w-full flex-col items-center justify-center"
      >
        <Image
          src="/images/logo.png"
          className=""
          width={350}
          height={110}
          alt="logo"
        />
        <h1 className="m-7 text-lg uppercase"></h1>
        {Object.values(providers).map((provider) => (
          <div
            className="btn m-1 flex flex-row bg-gray-600 p-3"
            key={provider.name}
          >
            <button className="flex w-full" onClick={() => signIn(provider.id)}>
              <img
                src={fetchimg(provider.name)}
                alt=""
                className="mr-3 rounded-full bg-white"
                width={30}
                height={20}
              />
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context
  const providers = await getProviders()
  const session = await getSession(context)
  // if (session && res) {
  //   res.statusCode = 302
  //   res.setHeader('Location', '/')
  // }

  return {
    props: {
      session,
      providers,
    },
  }
}
