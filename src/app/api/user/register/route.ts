import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  
  await connectToDatabase();
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({ name, email, password: hashedPassword });
  return NextResponse.json(newUser);
}
