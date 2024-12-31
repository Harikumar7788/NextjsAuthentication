'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"

const Dashboard = () => {
    const { data: session } = useSession()

    return (
        <div className="min-h-screen flex items-center justify-center">
            {session ? (
                <div>

                     <img src = {session.user?.image} className = "rounded-full w-20 h-20"/>
                    <h1>Welcome, {session.user?.name}</h1>
                    <p>Email Id {session.user?.email} </p>

                                       
                    <button 
                        onClick={() => signOut()} 
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <h1>Please sign in</h1>
                    <button 
                        onClick={() => signIn('google')} 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Sign in with Google
                    </button>
                    <button 
                        onClick={() => signIn('github')} 
                        className="mt-4 px-4 py-2 bg-gray-800 text-white rounded ml-2"
                    >
                        Sign in with GitHub
                    </button>
                </div>
            )}
        </div>
      
    )
}

export default Dashboard