'use client';

import dynamic from 'next/dynamic';

// Dynamically import LandingPage with SSR set to false
const LandingPage = dynamic(() => import('@/components/ui/LandingPage'), {
  ssr: false, // Disable server-side rendering for this component
});

const LandingPageWrapper = () => {
  return <LandingPage />;
};

export default LandingPageWrapper;
