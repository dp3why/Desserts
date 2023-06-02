import React from 'react'
import Image from 'next/image'

import { useRouter } from 'next/router'
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'
import { initFirebase } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const BACK = process.env.NEXT_PUBLIC_BACKEND_URL

export default function SignIn({}) {
  initFirebase()

  const router = useRouter()

  const auth = getAuth()
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return <div>Loading ... </div>
  }
  if (user) {
    router.push('/')
  }

  const handleSignIn = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider)
      const idToken = await result.user.getIdToken(true, {
        expiresIn: '1d',
      })
      localStorage.setItem('idToken', idToken)
      const response = await fetch(`${BACK}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: idToken }),
      })

      if (response.ok) {
        const data = await response.json()

        // Retrieve the JWT access token from the response
        const accessToken = data.access_token

        // Save the JWT access token in local storage or wherever needed
        localStorage.setItem('accessToken', accessToken)

        router.push('/')
      } else {
        throw new Error('Failed to sign in')
      }
    } catch (error) {
      console.error(error)
    }
  }
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
          src="/images/logonew3.png"
          className="rounded-full"
          width={80}
          height={80}
          alt="logo"
        />
        <h1 className="case m-6 text-lg font-semibold ">Let's get started</h1>

        <div className="btn my-4 flex flex-col bg-gray-600 p-3">
          <button
            className=" flex w-full px-2 py-1"
            onClick={() => handleSignIn(new GoogleAuthProvider())}
          >
            <img
              src="/images/google.png"
              alt=""
              className="mr-3 rounded-full bg-white"
              width={40}
            />
            Sign in with Google
          </button>
        </div>
        <div className="btn m-1 flex flex-col bg-gray-600 p-3">
          <button
            className="flex w-full px-2 py-1"
            onClick={() => handleSignIn(new GithubAuthProvider())}
          >
            <img
              src="/images/github.png"
              alt=""
              className="mr-3 rounded-full bg-white"
              width={40}
            />
            Sign in with Github
          </button>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { req, res } = context

  return {
    props: {},
  }
}
