const { isValid } = require('date-fns');

exports.validateInputDisaster = (req, res, next) => {
  const { name, place, detail} = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ status: false, message: "Name can't be empty" });
  }

  if (!isValid(new Date(detail.date))) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid date format, please use ISO 8601" });
  }

  if (!detail.type) {
    return res
      .status(400)
      .json({ status: false, message: "Detail type can't be empty" });
  }

  if (!detail.description) {
    return res
      .status(400)
      .json({ status: false, message: "Detail description can't be empty" });
  }

  if (!place) {
    return res
      .status(400)
      .json({ status: false, message: "Place can't be empty" });
  }

  next();
};
