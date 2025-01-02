import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '../../../../lib/models/user';

export const POST = async (req: Request) => {  // Use Request instead of Response
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const session = await getSession({ req });

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { email, password } = await req.json();  // Use await req.json() to get request body

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    user.email = email;

    if (password) {
      user.password = await hash(password, 10); // Hash new password
    }

    await user.save();

    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });  // Corrected status
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
