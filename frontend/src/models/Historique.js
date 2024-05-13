import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the schema for the nested item object
const itemSchema = new Schema({
  type: { type: String },
  model: { type: String },
  s_n: { type: String },
  n_i: { type: String },
  processeur: { type: String },
  carte_graphique: { type: String },
  stockage1: {
    typestk1: { type: String },
    stockage1: { type: String },
  },
  stockage2: {
    typestk2: { type: String },
    stockage2: { type: String },
  },
  // Add other fields as needed to match the provided object
});

// Define the main history schema
const historySchema = new Schema({
  ticketid: { type: String },
  item: { type: itemSchema }, // Reference to the nested item schema
  date: { type: Date },
  groupe: { type: String },
  technicien: { type: String },
  quantity: { type: String },
});

// Define the model
const historyModel =
  mongoose.models.history || mongoose.model("history", historySchema);

export default historyModel;
