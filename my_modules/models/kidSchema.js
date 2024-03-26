import mongoose from "mongoose";

const KidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
  },
  days: {
    type: Array,
  },
});

export const Kid = mongoose.model("kids", KidSchema);
export const GuestKidSchema = mongoose.model("guest-kids", KidSchema);
