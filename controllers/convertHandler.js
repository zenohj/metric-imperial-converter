function numberStringSplitter(input) {
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-Z]+/g) || [""];
  return [number[0], string[0]];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  if (nums.length > 2) return false;
  return nums;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums) return undefined;

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    if (isNaN(num1) || isNaN(num2)) return undefined;

    return parseFloat(num1) / parseFloat(num2);
  };

  this.getUnit = function (input) {
    let result = numberStringSplitter(input)[1];
    if (!result) return undefined;

    result = result.toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];
    if (!validUnits.includes(result)) return undefined;

    return result === "l" ? "L" : result;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    switch (unit) {
      case "gal": return "L";
      case "l": return "gal";
      case "mi": return "km";
      case "km": return "mi";
      case "lbs": return "kg";
      case "kg": return "lbs";
      default: return undefined;
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit.toLowerCase()) {
      case "gal": return "gallons";
      case "l": return "liters";
      case "mi": return "miles";
      case "km": return "kilometers";
      case "lbs": return "pounds";
      case "kg": return "kilograms";
      default: return "unknown unit";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit.toLowerCase()) {
      case "gal": return parseFloat((initNum * galToL).toFixed(5));
      case "l": return parseFloat((initNum / galToL).toFixed(5));
      case "mi": return parseFloat((initNum * miToKm).toFixed(5));
      case "km": return parseFloat((initNum / miToKm).toFixed(5));
      case "lbs": return parseFloat((initNum * lbsToKg).toFixed(5));
      case "kg": return parseFloat((initNum / lbsToKg).toFixed(5));
      default: return undefined;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;