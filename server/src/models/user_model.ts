import { compare, hash } from "bcrypt";
import { Model, ObjectId, Schema, model } from "mongoose";

interface IUser {
  username: string;
  email: string;
  password: string;
  verified: boolean;
  avatar?: { url: string; publicId: string };
  tokens: string[];
  favorites: ObjectId[];
  followers: ObjectId[];
  following: ObjectId[];
}

interface IMethods {
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema<IUser, {}, IMethods>({
  username: {
    type: String,
    required: true,
    trim: true 
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: Object,
    url: String,
    publicId: String
  },
  tokens: [String]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (this.isModified('password'))
    this.password = await hash(this.password, 10);
  next();
});

userSchema.methods.compareToken = async function(password: string) {
  return await compare(password, this.password);
}

export default model("User", userSchema) as Model<IUser, {}, IMethods>;