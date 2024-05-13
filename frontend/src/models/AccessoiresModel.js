import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AccessoiresSchema = new Schema({
  date: { type: Date },
  type: { type: String },
  quantity: { type: String },
});

const AccessoiresModel =
  mongoose.models.AccessoiresModel ||
  mongoose.model("AccessoiresModel", AccessoiresSchema);
export default AccessoiresModel;
