'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import React from 'react'
import { SessionWrapper } from '../Providers/SessionWrapper'

const Header = () => {
  const { data: session } = useSession()

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Ticket7 Dashboard</h1>

    
      {session ? (
        <div className="flex items-center space-x-4">
     
          <div className="flex items-center space-x-2">
            <img
              src={session.user?.image || '/default-profile.png'}
              alt="User Avatar"
              className="rounded-full w-10 h-10"
            />
            <span>{session.user?.name}</span>
          </div>

    
          <button
            onClick={() => signOut()}
            className="bg-red-500 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
     
          <button
            onClick={() => signIn('google')}
            className="bg-blue-500 px-4 py-2 rounded text-white"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('github')}
            className="bg-gray-800 px-4 py-2 rounded text-white"
          >
            Sign in with GitHub
          </button>
        </div>
      )}
    </header>
 
  )
}

export default Header
