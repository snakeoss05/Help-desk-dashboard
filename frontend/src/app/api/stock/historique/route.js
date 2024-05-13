import { NextResponse } from "next/server";
import history from "@/models/Historique";
import { connectToDatabase } from "@/dbconfig/dbconfig";

connectToDatabase();
export async function POST(req) {
  const { ticket, item, technicien, quantity } = await req.json();

  try {
    const Hist = new history({
      ticketid: ticket,
      item: item,
      date: new Date(),
      technicien: technicien,
      quantity: quantity,
    });

    await Hist.save();
    return NextResponse.json({ message: "Save succcess" }, { status: 200 });
  } catch (e) {
    console.error(`Unable to add product: ${e}`);
    return { error: e };
  }
}

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const totalItems = await history.countDocuments(); // Total number of items in the collection
  const totalPages = Math.ceil(totalItems / limit); // Total number of pages
  const startIndex = (page - 1) * limit; // Offset to skip items based on the current page
  const endIndex = page * limit;
  const results = {};

  if (endIndex < totalItems) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.results = await history
      .find()
      .limit(limit)
      .skip(startIndex)
      .select("-__v");

    return NextResponse.json({
      results,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (e) {
    console.error(`Unable to find history: ${e}`);
    return { error: e };
  }
}
