const mongoose = require("mongoose");
const config = require("config");
const mongoURI = config.get("mongoURI");

/**
 * Connects the app to the database
 * @param {string} MongoURI - unique string used to authenticate db access
 *
 * The program will crash if an error was encountered while trying to connect to the database
 */
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error(
      "An error was encountered while trying to connect to the DB which caused the program to crash: ",
      err.message
    );
    process.exit(1);
  }
};

module.exports = connectDB;
