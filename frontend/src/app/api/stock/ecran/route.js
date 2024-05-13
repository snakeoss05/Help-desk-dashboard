import { NextResponse } from "next/server";
import ScreenModel from "@/models/ScreenModel";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import mongoose from "mongoose";
connectToDatabase();
export async function POST(req) {
  const { mark, model, s_n, n_i, size } = await req.json();

  try {
    const newScreen = new ScreenModel({
      date: new Date(),
      mark: mark,
      model: model,
      s_n: s_n,
      n_i: n_i,
      size: size,
    });
    await newScreen.save();
    return NextResponse.json({ message: "successful Add" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const page = searchParams.get("page");
  const totalItems = await ScreenModel.countDocuments(); // Total number of items in the collection
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
    results.results = await ScreenModel.find()
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
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const count = searchParams.get("count");
  try {
    const upDate = await AdpModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },

      { $set: { quantity: count } },

      { new: true }
    );
    return NextResponse.json({ message: "success update" });
  } catch (e) {
    console.error(`Unable to Update: ${e}`);
    return { error: e };
  }
}
export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  try {
    await ScreenModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
    return NextResponse.json({ message: "successfel Removing" });
  } catch (e) {
    console.error(`Unable to delete Items with id ${id}: ${e}`);
    return NextResponse.json({ error: e });
  }
}
