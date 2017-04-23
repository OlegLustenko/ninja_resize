import mongoose from 'mongoose';
import config from 'config';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: 'User name required' },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: 'Email пользователя не должен быть пустым',
    validate: [
      {
        validator: function checkEmail(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        msg: 'Укажите, пожалуйста, корректный email.'
      }
    ]
  },
  role: {
    type: ObjectId,
    required: true
  },
  lastlogin: { type: Number, default: 0 },
  isActivated: { type: Boolean, default: false }
});

export default mongoose.model('User', UserSchema);
