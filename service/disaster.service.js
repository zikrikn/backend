const disasterRepository = require("../repository/disaster.repository");

async function publishDisaster(disasterData) {
  const {
    name,
    detail,
    place,
    latitude,
    longitude,
    donations,
    picture,
    people_gone,
    discuss,
    timestamp,
  } = disasterData;

  if (!name || !detail || !place || !picture) {
    throw new Error("Required fields are missing");
  }

  const disaster = await disasterRepository.addDisaster({
    name,
    detail,
    place,
    latitude,
    longitude,
    donations,
    picture,
    people_gone,
    discuss,
    timestamp,
  });

  return disaster;
}

async function getListDisaster(queryParams) {
  let query = {};
  
  if (queryParams.name) {
    query.name = { $regex: new RegExp(queryParams.name, "i") };
  }
  if (queryParams.place) {
    query.place = { $regex: new RegExp(queryParams.place, "i") };
  }
  if (queryParams.type) {
    query["detail.type"] = { $regex: new RegExp(queryParams.type, "i") };
  }
  if (queryParams.date) {
    query["detail.date"] = queryParams.date;
  }

  return await disasterRepository.getListDisaster(query);
}

async function addPeopleGone(disasterId, peopleData) {
  return await disasterRepository.addPeopleGone(disasterId, peopleData);
}

async function updatePeopleGone(disasterId, personId, updateFields) {
  return await disasterRepository.updatePeopleGone(disasterId, personId, updateFields);
} // Here

async function getDisasterById(disasterId) { 
  return await disasterRepository.getDisasterById(disasterId);
}

module.exports = {
  publishDisaster,
  getListDisaster,
  addPeopleGone,
  updatePeopleGone,
  getDisasterById,
};
