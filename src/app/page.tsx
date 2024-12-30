'use client';  

import React from 'react';
import Dashboard from '../components/ui/Dashboard';
import Header from '../components/ui/Header';
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
      <Dashboard/>
    </div>
  );
};

export default LandingPage;
