import clientPromise from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db("EJP-auth");
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists." },
        { status: 409 }
      );
    }

    await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Registration failed due to a server error." },
      { status: 500 }
    );
  }
}
