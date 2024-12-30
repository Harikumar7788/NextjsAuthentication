'use client';  

import React from 'react';
// import { useRouter } from 'next/router';

const LandingPage = () => {
  // const router = useRouter();  

  const handleLoginClick = () => {
    // router.push('/login');  
  };

  const handleRegisterClick = () => {
    // router.push('/register');  
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Ticket7!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Manage your events, view your tickets, and get started with ease. Please log in or register to continue.
        </p>

        {/* Login and Register Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleLoginClick}
            className="py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Login
          </button>

          <button
            onClick={handleRegisterClick}
            className="py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
