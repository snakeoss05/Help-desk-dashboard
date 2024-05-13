import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cableSchema = new Schema({
  date: { type: Date },
  type: { type: String },
  height: { type: String },
  quantity: { type: String },
});

const cableModel =
  mongoose.models.cableModel || mongoose.model("cableModel", cableSchema);

export default cableModel;
