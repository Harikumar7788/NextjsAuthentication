import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextInput from '../Common/TextInput';
import Button from '../Common/Button';
import Message from '../Common/Message';
import Link from 'next/link';  // Import Link from next/link

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (res.ok) {
        router.push('/login');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to register');
      }
    } catch {
      setLoading(false);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 max-w-md w-full bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-cyan-700">Register</h2>
        
        {/* Display error message if exists */}
        {error && <Message type="error" text={error} />}

        <form onSubmit={handleRegister}>
          <TextInput
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="Enter your email"
            required
          />

          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Enter your password"
            required
          />

          <Button
            type="submit"
            color="green"
          >
            {loading ? 'Registering...' : 'Register'}
          </Button>

          {/* Use Link from next/link instead of <a> */}
          <h2>Already Have an Account? <Link href="/login">Login</Link></h2>
        </form>
      </div>
    </div>
  );
}
