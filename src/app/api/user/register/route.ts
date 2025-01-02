import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongoose";
import { User } from "../../../../lib/models/user";
// import bcrypt from "bcryptjs"; // Optional: Uncomment if you plan to hash the password later

export async function POST(req: Request) {
  try {
    // Extract the email and password from the request body
    const { email, password } = await req.json();
    console.log("Register Data", email);
    console.log("Register Data", password);

    // Connect to MongoDB
    await connectToDatabase();

    // Check if the user already exists based on the email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Optionally hash the password before saving (using bcrypt)
    // const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user record
    const newUser = await User.create({ email, password: password }); // Use hashedPassword if you're hashing

    // Return a success response with user details (excluding password for security reasons)
    return NextResponse.json({ message: "User created successfully", user: { email: newUser.email } }, { status: 201 });
  } catch (err) {
    console.error("Error registering user:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
