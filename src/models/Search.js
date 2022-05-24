const mongoose = require("mongoose");

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

module.exports = mongoose.model("search", SearchSchema);
