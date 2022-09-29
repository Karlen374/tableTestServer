import mongoose from "mongoose";

const TableRow = new mongoose.Schema({
  date: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, required:true },
  distance: { type: Number, required: true },
  authorId: { type: String, required: true },
  _id: { type: String, required: true }
}, { versionKey: false })

export default mongoose.model('TableRow',TableRow)