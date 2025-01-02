'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import EditProfile from './EditProfile';
import Button from '../Common/Button';
import Avatar from '../Common/Avatar';
import Modal from '../Common/Modal';

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        {session ? (
          <>
            <Avatar
              src={session.user?.image || '/default-avatar.png'}
              alt="User Avatar"
              size="medium"
            />
            <div className="text-right">
              <p className="font-medium">{session.user?.name}</p>
              <span className="text-sm">{session.user?.email}</span>
            </div>
            <Button
              color="gray"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
            <Button
              color="green"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </div>

      {isEditing && session && (
        <Modal onClose={handleClose}>
          <EditProfile user={session.user?.email ? { email: session.user.email } : undefined} onClose={handleClose} />

        </Modal>
      )}
    </header>
  );
};

export default Header;
