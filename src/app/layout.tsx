// src/app/layout.tsx or src/app/_layout.tsx (depending on your Next.js version)
import { SessionWrapper } from '../components/Providers/SessionWrapper';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
  
      <html lang="en">

        <body> <SessionWrapper>{children} </SessionWrapper> </body>
      </html>
  );
}
