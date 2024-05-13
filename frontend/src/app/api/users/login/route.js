import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import User from "@/models/user";
import { cookies } from "next/headers";
connectToDatabase();
export async function POST(req, res) {
  const reqBody = await req.json();
  const { email, password } = reqBody;

  const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET;
  const user = await User.findOne({ email: email });

  try {
    if (!user) {
      return NextResponse.json(
        { message: "User not registered." },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Wrong password" }, { status: 400 });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, secretOrPrivateKey, { expiresIn: "1d" });

    const response = NextResponse.json(
      { user: user },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
    cookies().set("token", token);

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error.", error);
  }
}
