exports.validateInputDisaster = (req, res, next) => {
  const { name, place, detail} = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

  if (!name) {
    return res
      .status(400)
      .json({ status: false, message: "Name can't be empty" });
  }

  if (!dateRegex.test(detail.date)) {
    return res
      .status(400)
      .json({ status: false, message: "Invalid date format (DD/MM/YYYY)" });
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
