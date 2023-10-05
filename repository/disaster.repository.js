const mongoose = require("mongoose");
const Disaster = require("../model/disaster.model");
const logger = require("../logger/api.logger");

async function addDisaster(disaster) {
  let data = {};
  try {
    data = await Disaster.create(disaster);
  } catch (error) {
    logger.error(error.message);
  }
  return data;
}

async function getListDisaster(query) {
  let data = {};
  try {
    data = await Disaster.find(query);
  } catch (error) {
    logger.error(error.message);
  }
  return data;
}

async function addPeopleGone(disasterId, peopleData) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  disaster.people_gone.push(peopleData);
  await disaster.save();
  return disaster;
}

// Here
async function updatePeopleGone(disasterId, personId, updateFields) {
  const disaster = await Disaster.findById(disasterId);
  if (!disaster) {
    throw new Error("Disaster not found");
  }

  const person = disaster.people_gone.id(personId);
  if (!person) {
    throw new Error("Person not found");
  }

  Object.assign(person, updateFields);
  await disaster.save();
  return disaster;
}

async function getDisasterById(disasterId) {
  try {
    // Construct the filter object to find by ID
    const filter = { _id: new mongoose.Types.ObjectId(disasterId) };

    // Use the filter object in the find() method
    const disaster = await Disaster.findOne(filter);

    return disaster;
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
}

module.exports = {
  addDisaster,
  getListDisaster,
  addPeopleGone,
  updatePeopleGone,
  getDisasterById,
};
