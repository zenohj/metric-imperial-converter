'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    const input = req.query.input || '';
   const initNum = convertHandler.getNum(input);
const initUnit = convertHandler.getUnit(input);

if (initNum === undefined && initUnit === undefined) {
  return res.json({ error: ' invalid number and unit ' });
}
if (initNum === undefined) {
  return res.json({ error: ' invalid number ' });
}
if (initUnit === undefined) {
  return res.json({ error: ' invalid unit ' });
}


    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};