'use client';

import React from 'react';
import Dashboard from '../components/ui/Dashboard';
import Header from '../components/ui/Header';
import { SessionProvider } from 'next-auth/react';

interface LandingPageProps {
  session?: any;  
}

const LandingPage: React.FC<LandingPageProps> = ({ session }) => {
  return (
    <SessionProvider session={session}>
           <Header/>
        <Dashboard/>
    </SessionProvider>
  );
};

export default LandingPage;
