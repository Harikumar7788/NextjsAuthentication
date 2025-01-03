import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../../lib/models/user";
import crypto from "crypto"; // Built-in Node.js module for hashing

// Function to hash passwords
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    console.log("Register Data", email);

    // Validation
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password before storing
    const hashedPassword = hashPassword(password);

    // Create a new user record with the hashed password
    const newUser = await User.create({ email, password: hashedPassword });

    // Return success response (exclude password)
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    return NextResponse.json(
      { message: "User created successfully", user: userWithoutPassword },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
