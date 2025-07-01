import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 15,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model('User', userSchema);
