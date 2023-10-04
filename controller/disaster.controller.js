const disasterService = require("../service/disaster.service");
const { body, validationResult } = require("express-validator");
const logger = require("../logger/api.logger");

module.exports.AddDisaster = [
  body("detail.date").custom((value) => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(value)) {
      throw new Error("Invalid date format (DD/MM/YYYY)");
    }
    return true;
  }),

  async (req, res) => {
    try {
      logger.info("Add disaster : ", req.body);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
        .status(400)
        .json({ status: false, message: "Detail date format must DD/MM/YYYY like 01/01/2023" });
      }

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
      }
      else {
        logger.error(error.message);
        res
          .status(500)
          .json({ status: false, message: "Internal server error." });
      }
    }
  },
]

module.exports.GetListDisaster = async (req, res) => {
  try {
    const nameQuery = req.query.name || "";
    const placeQuery = req.query.place || "";
    const typeQuery = req.query.type || "";
    const dateQuery = req.query.date || ""
    const listDisaster = await disasterService.getListDisaster({
      name: nameQuery,
      place: placeQuery,
      type: typeQuery,
      date: dateQuery,
    });
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
