'use client';

import { useState, useEffect } from 'react';
import TextInput from '../Common/TextInput';
import Button from '../Common/Button';
import Message from '../Common/Message';

interface User {
  email?: string;
}

const EditProfile = ({ user, onClose }: { user?: User; onClose: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json(); // Ensure you parse the JSON correctly
  
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }
  
      setSuccess('Profile updated successfully!');
      setTimeout(onClose, 2000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    }
  };
  

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-slate-400 p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Loading Profile...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-slate-400 p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder='Email'
            required
          />
          <TextInput
            label="New Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="New password"
          />
          <TextInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm password"
          />

          {error && <Message type="error" text={error} />}
          {success && <Message type="success" text={success} />}

          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} color="gray">
              Cancel
            </Button>
            <Button type="submit" color="green">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
