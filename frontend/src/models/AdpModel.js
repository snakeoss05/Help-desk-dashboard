import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AdpSchema = new Schema({
  date: { type: Date },
  type: { type: String },
  quantity: { type: String },
});

const AdpModel =
  mongoose.models.AdpModel || mongoose.model("AdpModel", AdpSchema);

export default AdpModel;
