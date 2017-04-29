import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import oid from '../libs/db/oid';

const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: 'User name required', unique: true },
  passwordHash: { type: String },
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
  salt: {
    required: true,
    type: String
  },
  role: {
    type: ObjectId,
    required: true,
    ref: 'Roles',
    default: oid('admin-role')
  },
  lastVisited: { type: Number, default: Date.now() },
  isActivated: { type: Boolean, default: false }
});

UserSchema.virtual('password')
  .set(function(password) {
    if (password !== undefined) {
      if (password.length < 4) {
        this.invalidate('password', 'Пароль должен быть минимум 4 символа.');
      }
    }
    this._plainPassword = password;

    this.salt = bcrypt.genSaltSync(8);
    this.passwordHash = bcrypt.hashSync(password, this.salt);
  })
  .get(function() {
    return this._plainPassword;
  });

UserSchema.methods.validPassword = function(password) {
  // empty password means no login by password
  if (!password) return false;
  // this user does not have password (the line below would hang!)
  if (!this.passwordHash) return false;

  return bcrypt.compareSync(password, this.passwordHash);
};

export default mongoose.model('User', UserSchema);
