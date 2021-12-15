const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect DB successfully!");
  } catch (error) {
    console.log(error);
    console.log("Connect DB failure!");
  }
}

module.exports = { connect };
