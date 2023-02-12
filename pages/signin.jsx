import React, { useEffect } from 'react'
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

  const signInGo = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
    if (user) {
      router.push('/')
    }
  }

  const signInGit = async () => {
    const provider = new GithubAuthProvider()
    const result = await signInWithPopup(auth, provider)
    console.log(result.user)
    if (user) {
      router.push('/')
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
          src="/images/logonew.png"
          className="rounded-full"
          width={80}
          height={80}
          alt="logo"
        />
        <h1 className="case m-6 text-lg font-semibold ">Let's get started</h1>

        <div className="btn my-4 flex flex-col bg-gray-600 p-3">
          <button className=" flex w-full px-2 py-1" onClick={signInGo}>
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
          <button className="flex w-full px-2 py-1" onClick={signInGit}>
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
