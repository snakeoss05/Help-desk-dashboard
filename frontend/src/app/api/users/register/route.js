import { connectToDatabase } from "@/dbconfig/dbconfig";
import bcryptjs from "bcryptjs";
import { join } from "path";
import { writeFile } from "fs/promises";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/user";
import otpGenerator from "otp-generator";

connectToDatabase();

export async function POST(req, res) {
  const reqBody = await req.formData();
  const profilePicture = reqBody.get("file");
  const name = reqBody.get("name");
  const lastname = reqBody.get("lastname");
  const email = reqBody.get("email");
  const password = reqBody.get("password");
  const role = reqBody.get("role");

  try {
    if (!name || !email || !password) {
      return NextResponse.json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        400 // Pass status as the second argument
      );
    }

    if (!profilePicture) {
      return NextResponse.json(
        { error: "No files received." }, // Check the response format and structure
        400 // Pass status as the second argument
      );
    }
    // generate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await User.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
      result = await User.findOne({ otp: otp });
    }

    const buffer = Buffer.from(await profilePicture.arrayBuffer());
    const filename = profilePicture.name.replaceAll(" ", "_");
    const imageUrlUnique = Date.now() + filename;
    const path = join("public/uploads", imageUrlUnique);
    await writeFile(path, buffer);

    const imageUrl = `/uploads/${imageUrlUnique}`;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      lastname: lastname,
      email: email,
      password: hashedPassword,
      role: role || "user",
      profilePicture: imageUrl,
      otp: otp,
      isVerified: false,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      { message: "Register successful" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    return NextResponse.json(
      { error: "Bad Request: " + error.message },
      { status: 400 }
    );
  }
}
export async function GET(req) {
  try {
    const AdminList = await User.find({ role: "admin" });

    return NextResponse.json({ AdminList }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
