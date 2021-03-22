const removeSameElements = (datesArray) => {
  let dates = [];
  for (let i = 0; i < datesArray.length; i++) {
    const dateTime = new Date(datesArray[i]);
    var date = `${dateTime.getFullYear()}-${
      dateTime.getMonth() + 1
    }-${dateTime.getDate()}`;
    if (!dates.includes(date)) dates.push(date);
  }
  return dates;
};

const stringIntoObject = (datesArray) => { 
  var arrayOfDates = datesArray
    .replace("[", "")
    .replace("]", "")
    .replace(/'/g, "")
    .split(",")
    .map((date) => new Date(date));
  return arrayOfDates;
};

module.exports = { removeSameElements, stringIntoObject };
