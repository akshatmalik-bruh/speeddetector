const mongoose = require("mongoose");

const speedSchema = new mongoose.Schema(
  {
    speed: {
      type: Number, 
      required: true,
    },
    stat: {
      type: String,
      required: true,
      enum: ["overspeeding", "not overspeeding"],
    },
    image: {
      type: String, 
    },
  },
  {
    timestamps: true, 
  }
);

const Raftaar = mongoose.model("speed", speedSchema);

module.exports = {Raftaar};