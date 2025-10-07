import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import generateCode from '../utils/generateCode.js';
const AdminSchema = new Schema({
  maNguoiDung: {
    type: String,
    required: true,
    unique: true,
    default: () => generateCode('FAN'),
  },
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
