import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../lib/authOptions';
import { connectToDatabase } from '@/lib/mongoose';
import { User } from '@/lib/models/user';
import crypto from 'crypto';


function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const POST = async (req: Request) => {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  }

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }


  const { email, password } = await req.json();


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
      user.password = hashPassword(password); 
    }


    await user.save();

 
    return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};
