import User from "@/models/user";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import { NextResponse, NextRequest } from "next/server";
connectToDatabase();

export async function POST(req, res) {
  const { otp, email } = await req.json();
  try {
    const response = await User.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (response[0].otp != otp) {
      return NextResponse.json(
        {
          message: "The OTP is not valid",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { success: true, message: "success verified" },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json(
      { error: "Bad Request: " + error.message },
      { status: 400 }
    );
  }
}
