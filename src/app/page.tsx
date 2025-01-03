'use client';

import React from 'react';
import LandingPage from '@/components/ui/LandingPage';
import { SessionProvider } from 'next-auth/react';

const Page: React.FC = () => {
  return (
    <SessionProvider>
     
      <LandingPage />
    </SessionProvider>
  );
};

export default Page;
