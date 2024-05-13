import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScreenSchema = new Schema({
  date: { type: Date },
  mark: { type: String },
  model: { type: String },
  s_n: { type: String },
  n_i: { type: String },

  size: { type: String },
});
const ScreenModel =
  mongoose.models.ScreenModel || mongoose.model("ScreenModel", ScreenSchema);

export default ScreenModel;
