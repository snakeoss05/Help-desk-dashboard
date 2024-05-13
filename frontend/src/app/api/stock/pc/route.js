import { NextResponse } from "next/server";
import PcModel from "@/models/PcModel";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import mongoose from "mongoose";
connectToDatabase();
export async function POST(req) {
  const {
    ram,
    type,
    model,
    s_n,
    n_i,
    stockage1,
    stockage2,
    processeur,
    carte_graphique,
  } = await req.json();

  try {
    const newPc = new PcModel({
      date: new Date(),
      type: type,
      model: model,
      s_n: s_n,
      n_i: n_i,
      ram: {
        typeram: ram.typeram,
        stockageram: ram.stockageram,
      },
      stockage1: {
        typestk1: stockage1.typestk1,
        stockage1: stockage1.stockage1,
      },
      stockage2: {
        typestk2: stockage2.typestk2,
        stockage2: stockage2.stockage2,
      },
      processeur: processeur,
      carte_graphique: carte_graphique,
    });
    await newPc.save();
    return NextResponse.json({ message: "successful Add" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const totalItems = await PcModel.countDocuments(); // Total number of items in the collection
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
    results.results = await PcModel.find()
      .limit(limit)
      .skip(startIndex)
      .select("-__v");

    return NextResponse.json({
      results,
      currentPage: page,
      totalPages,
      totalItems,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
export async function UPDATE(req) {
  const { id } = req.params;
  const { ram, stockage1, stockage2 } = await req.json();
}
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    await PcModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    return NextResponse.json({ message: "successfel Removing" });
  } catch (e) {
    console.error(`Unable to delete Items with id ${id}: ${e}`);
    return NextResponse.json({ error: e });
  }
}
