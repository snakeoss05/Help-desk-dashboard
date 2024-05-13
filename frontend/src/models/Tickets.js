import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TicketsSchema = new Schema({
  ticketId: { type: new ObjectId(date) },
  fullname: { type: String },
  start: { type: String },
  end: { type: String },
  service: { type: String },
  priority: { type: String },
  affected: { type: String },
  message: { type: String },
  status: { type: String },
  file: { type: String },
  comments: { type: String },
});

const Ticket =
  mongoose.models.Tickets || mongoose.model("Tickets", TicketsSchema);

export default Ticket;
