'use client';

import React from 'react';
import Dashboard from '../components/ui/Dashboard';
import Header from '../components/ui/Header';
import { SessionProvider } from 'next-auth/react';

const LandingPage: React.FC = () => {
  return (
    <SessionProvider>
    <Header title="My Dashboard"/>
      <Dashboard />
    </SessionProvider>
  );
};

export default LandingPage;
