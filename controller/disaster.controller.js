const disasterService = require("../service/disaster.service");
const logger = require("../logger/api.logger");

module.exports.AddDisaster = async (req, res) => {
  try {
    logger.info("Add disaster : ", req.body);
    const disasterData = req.body;
    const disaster = await disasterService.publishDisaster(disasterData);
    res.status(200).json({
      message: "Disaster added",
      success: true,
      data: disaster,
    });
  } catch (error) {
    logger.error(error.message);
    if (error.message === "Required fields are missing") {
      res
        .status(400)
        .json({ status: false, message: "Required fields are missing." });
    } else {
      logger.error(error.message);
      res
        .status(500)
        .json({ status: false, message: "Internal server error." });
    }
  }
};

module.exports.GetListDisaster = async (req, res) => {
  try {
    logger.info("List disaster : ", req.body);
    const listDisaster = await disasterService.getListDisaster();
    res.status(200).json({
      message: "OK",
      success: true,
      data: listDisaster,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
