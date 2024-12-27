

import bcrypt from "bcryptjs";
import Admin from "@/DataSchema/UserSchema"; 
import connectToDb from "@/lib/db"; 
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();  
     console.log("Regsiter Email",email)
     console.log("Regsiter Password",password)
    await connectToDb();

 
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      email,
      password: hashedPassword,
    });

   
    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
