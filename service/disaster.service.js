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
