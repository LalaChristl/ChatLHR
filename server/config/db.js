const mongoose = require("mongoose");

module.exports = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🦩 Connected to DB".yellow);
  } catch (error) {
    console.log("Error connecting to DB", error.message);

    process.exit(1);
  }
};
