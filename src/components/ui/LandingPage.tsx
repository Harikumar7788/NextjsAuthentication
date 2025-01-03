'use client'; // Ensures the component is rendered only on the client-side

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const LandingPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 

    const interval = setInterval(() => {
   
      toast.info('Please sign in to access your dashboard', {
        position: 'top-center',
        autoClose: 10000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 20000); 


    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
      <div className="text-center p-8 max-w-xl mx-auto bg-opacity-70 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-6">Ticket 7</h1>
        <p className="text-lg mb-6">Welcome to the ultimate event management platform! Start managing your events today.</p>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            <Link href="/login">Sign In</Link>
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition"
          >
            <Link href="/register">Sign Up</Link>
          </button>
        </div>

        <button
          className="bg-orange-500 text-white px-8 py-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          <Link href="/tickets">Get Tickets</Link>
        </button>

        <div className="mt-8">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz5Gt8bUxMyoMSx0o85XIT79oN_koAHM3rEQ&s" 
            alt="Event Management"
            className="w-full max-w-xs mx-auto mt-8 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LandingPage;
