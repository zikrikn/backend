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

async function getListDisaster() {
  return await disasterRepository.getListDisaster();
}

module.exports = {
  publishDisaster,
  getListDisaster,
};
