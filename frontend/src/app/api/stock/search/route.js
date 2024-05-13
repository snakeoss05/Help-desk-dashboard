import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import PcModel from "@/models/PcModel";
import ScreenModel from "@/models/ScreenModel";

connectToDatabase();
export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get("query");
    const category = searchParams.get("category");

    if (category === "pc") {
      const results = await PcModel.find({
        s_n: { $regex: query, $options: "i" },
      });
      return NextResponse.json({ results });
    }
    if (category === "ecran") {
      const results = await ScreenModel.find({
        model: { $regex: query, $options: "i" },
      });
      return NextResponse.json({ results });
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Error searching inventory" },
      { status: 500 }
    );
  }
}
