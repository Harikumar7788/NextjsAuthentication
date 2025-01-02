'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import EditProfile from './EditProfile';
// import Avatar from '../Common/Avatar';  // Reusable Avatar component
import Button from '../Common/Button';  // Reusable Button component

// Dashboard component
const Dashboard = () => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h1>
        <div className="flex flex-col items-center">
          {session ? (
            <>
              {/* <Avatar image={session.user?.image} alt="User Avatar"/> */}
              <div>
                <p className="text-xl font-medium">{session.user?.name}</p>
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
            <span className="text-gray-500">Sign In...</span>
          )}
        </div>

        {isEditing && session && (
          <EditProfile user={session.user?.email ? { email: session.user.email } : undefined} onClose={handleClose} />

        )}
      </div>
    </div>
  );
};

export default Dashboard;
