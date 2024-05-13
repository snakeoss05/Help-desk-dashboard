import history from "@/models/Historique";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

connectToDatabase();
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    const results = history.find({ _id: id });
    return NextResponse.json({ results });
  } catch (err) {
    return NextResponse.json({ error: err.message });
  }
}
