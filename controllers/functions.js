
const FunctionsService = require('../services/functions');

exports.createPdf = async (req, res, next) => {
  try {
    const data = req.body;
    const pdf = await FunctionsService.createPdf(data);
    res.status(201).json({ success: true, code: '201', data: pdf, message: "PDF Retornado exitosamente!" });
  } catch (err) {
    next(err);
  }
};