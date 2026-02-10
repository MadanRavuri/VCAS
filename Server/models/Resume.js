import mongoose, { Schema } from 'mongoose';

const ResumeSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  position: { type: String, required: true },
  experience: { type: String },
  education: { type: String },
  skills: [{ type: String }],
  resumeFile: { type: String }, // Store base64 data
  coverLetter: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Resume', ResumeSchema);
