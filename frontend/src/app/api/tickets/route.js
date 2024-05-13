import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import Ticket from "@/models/Ticket";
import { join } from "path";
import { writeFile } from "fs/promises";

connectToDatabase();
export async function POST(req, res) {
  const reqBody = await req.json();
  const file = reqBody.get("file");
  const name = reqBody.get("name");
  const start = reqBody.get("start");
  const end = reqBody.get("end");
  const service = reqBody.get("service");
  const priority = reqBody.get("priority");
  const affected = reqBody.get("affected");
  const message = reqBody.get("message");
  const status = reqBody.get("status");

  try {
    if (file) {
      const buffer = Buffer.from(await profilePicture.arrayBuffer());
      const filename = profilePicture.name.replaceAll(" ", "_");
      const imageUrlUnique = Date.now() + filename;
      const path = join("public/uploads", imageUrlUnique);
      await writeFile(path, buffer);
      const fileUrl = `/uploads/${imageUrlUnique}`;
      const newTicket = new Ticket({
        name,
        start,
        end,
        service,
        priority,
        affected,
        message,
        status,
        file: fileUrl,
      });
      await newTicket.save();
      return NextResponse.json(
        { message: "Ticket created successfully" },
        { status: 200 }
      );
    }

    const newTicket = new Ticket({
      name,
      start,
      end,
      service,
      priority,
      affected,
      message,
      status,
    });
    await newTicket.save();
    return NextResponse.json(
      { message: "Ticket created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
export async function GET() {
  const searchParams = req.nextUrl.searchParams;
  const service = searchParams.get("service");
  try {
    if (!service) {
      return NextResponse.json(
        { message: "service not found" },
        { status: 404 }
      );
    }
    const tickets = await Ticket.find({ service: service });
    return NextResponse.json(tickets);
  } catch (error) {
    return NextResponse.json({ message: "service not found" }, { status: 404 });
  }
}
