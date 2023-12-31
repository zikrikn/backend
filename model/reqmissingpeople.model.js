// missingPeople.model.js
const mongoose = require("mongoose");

const reqMissingPeopleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    bencana_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    missing_people_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: Boolean,
    },
    weight: {
      type: String,
    },
    height: {
      type: String,
    },
    age: {
      type: String,
    },
    address: {
      type: String,
    },
    last_seen: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false, // Hide the __v field
  }
);

module.exports = mongoose.model("ReqMissingPeople", reqMissingPeopleSchema);
