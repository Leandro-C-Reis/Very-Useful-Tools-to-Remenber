import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const ToolSchema = new mongoose.Schema({
  id: Number,
  title: String,
  link: String,
  description: String,
  tags: [String]
});

export default mongoose.model(`${process.env.DB_NAME}`, ToolSchema);