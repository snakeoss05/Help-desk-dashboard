import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDatabase();
export async function GET(req) {
  try {
    const userId = await getDataFromToken(req);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
