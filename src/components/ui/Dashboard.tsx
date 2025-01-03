'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditProfile from '@/components/ui/EditProfile';
import Button from '@/components/Common/Button';
import Link from 'next/link';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h1>
        <div className="flex flex-col items-center">
          {session ? (
            <>
              <div>
                {/* <p className="text-xl font-medium">{session.user?.name}</p> */}
                <span className="text-gray-500">{session.user?.email}</span>
              </div>
              <div className="mt-6 space-x-4">
                <Button onClick={handleEditProfile} color="gray">
                  Edit Profile
                </Button>
                <Button onClick={() => signOut()} color="green">
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Link href ="/login">
              <button className="rounded border-green-400 bg-gray-200 w-26 h-26 p-3 text-gray-500 font-extrabold">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {isEditing && session && (
          <EditProfile
            user={session.user?.email ? { email: session.user.email } : undefined}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;