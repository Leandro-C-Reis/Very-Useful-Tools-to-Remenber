import mongoose from 'mongoose';

const ToolSchema = new mongoose.Schema({
  id: Number,
  title: String,
  link: String,
  description: String,
  tags: [String]
});

export default mongoose.model('tools', ToolSchema);