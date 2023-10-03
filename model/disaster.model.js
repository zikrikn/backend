const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: Number,
  platform_name: String,
  source: String,
  holder_name: String,
});

const peopleGoneSchema = new mongoose.Schema({
  status: Boolean,
  name: String,
  weight: String,
  height: String,
  age: String,
  address: String,
  last_seen: String,
  timestamp: Date,
});

const discussSchema = new mongoose.Schema({
  name: String,
  comment: String,
  timestamp: Date,
});

const disasterSchema = new mongoose.Schema(
  {
    name: String,
    detail: {
      type: String,
      date: Date,
      description: String,
    },
    place: String,
    latitude: Number,
    longitude: Number,
    donations: [donationSchema],
    picture: String,
    people_gone: [peopleGoneSchema],
    discuss: [discussSchema],
    timestamp: Date,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Disaster", disasterSchema);
