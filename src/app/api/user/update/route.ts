import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/lib/models/user';

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  // Get the session, using getServerSession
  const session = await getServerSession(authOptions);

  // Ensure session has user id
  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // Extract email and password from the request body
  const { email, password } = await req.json();

  // Validate email
  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    // Connect to the database
    await connectToDatabase();

    // Find the user in the database using the session user's id
    const user = await User.findById(session.user);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Update the user's email and password if provided
    user.email = email;

    if (password) {
      user.password = password;
    }

    // Save the updated user
    await user.save();

    // Return a successful response
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
