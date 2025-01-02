import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../../lib/models/user";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log("Register Data", email)
  console.log("Register Data",password)

  await connectToDatabase();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });
  return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
}
