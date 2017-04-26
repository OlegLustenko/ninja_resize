import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const RolesSchema = new mongoose.Schema({
  _creator: { type: ObjectId, ref: 'User' },
  title: { type: String, default: 'user', lowercase: true }
});

export default mongoose.model('Roles', RolesSchema);
