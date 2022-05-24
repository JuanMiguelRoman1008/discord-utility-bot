import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  limit: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  party: [
    {
      user: {
        type: String,
        required: true,
      },
      datetime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Search = mongoose.model("search", SearchSchema);
