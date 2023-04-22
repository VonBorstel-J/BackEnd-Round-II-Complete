import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10; 

require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

// Create a new MongoDB Atlas connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "<mydatabase>"
  }).then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch((err) => {
    console.error(err);
  });

// Define a new Mongoose schema for users
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define a Mongoose model for users
const User = mongoose.model("User", userSchema);

const API_URL = "/api";

// User registration method
export const register = async (email, password, firstName, lastName) => {
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error("An error occurred while signing up");
  }
};

// User login method
export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("User not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid email or password");
    }
    return user;
  } catch (error) {
    throw new Error("Invalid email or password");
  }
};
