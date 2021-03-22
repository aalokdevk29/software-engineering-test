const maxConsecutiveLogin = (dates, res) => {
  let startDate,
    endDate,
    length = 0,
    prevLength = 0,
    prevStartDate,
    prevEndDate;
  if (dates.length === 1 || dates.length === 0) {
    //handle if only 1 date is their
    var date = new Date(dates[0]);
    startDate =
      dates.length === 1
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : "";
    endDate =
      dates.length === 1
        ? `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        : "";
    length = dates.length === 1 ? 1 : 0;
    res.render("index", {
      length: length.toString(),
      startDate: startDate.toString(),
      endDate: endDate.toString(),
    });
  } else {
    //handle if more than 1 date is their
    for (let i = 0; i < dates.length; i++) {
      var date = new Date(dates[i]);
      var prevDate = 0;
      if (i !== 0) prevDate = new Date(dates[i - 1]);
      if (
        //handle normal consecutive dates
        i !== 0 &&
        date.getDate() === prevDate.getDate() + 1 &&
        date.getMonth() === prevDate.getMonth() &&
        date.getFullYear() === prevDate.getFullYear()
      ) {
        if (length === 0) startDate = prevDate;
        endDate = date;
        length = length + 1;
      } else if (
        //handle feb month consecutive dates
        i !== 0 &&
        date.getDate() === 1 &&
        (prevDate.getDate() === 28 || prevDate.getDate() === 29) &&
        prevDate.getMonth() === 1 &&
        date.getMonth() === 2 &&
        date.getFullYear() === prevDate.getFullYear()
      ) {
        if (length === 0) startDate = prevDate;
        endDate = date;
        length = length + 1;
      } else if (
        //handle month change consecutive dates with 31 month days
        i !== 0 &&
        prevDate.getDate() === 31 &&
        date.getDate() === 1 &&
        (((prevDate.getMonth() + 1) % 2 === 1 && prevDate.getMonth() + 1 < 7) ||
          ((prevDate.getMonth() + 1) % 2 === 0 &&
            prevDate.getMonth() + 1 > 7)) &&
        date.getMonth() === prevDate.getMonth() + 1 &&
        date.getFullYear() === prevDate.getFullYear()
      ) {
        if (length === 0) startDate = prevDate;
        endDate = date;
        length = length + 1;
      } else if (
        //handle month change consecutive dates with 30 month days
        i !== 0 &&
        prevDate.getDate() === 30 &&
        date.getDate() === 1 &&
        (((prevDate.getMonth() + 1) % 2 === 0 && prevDate.getMonth() + 1 < 7) ||
          ((prevDate.getMonth() + 1) % 2 === 1 &&
            prevDate.getMonth() + 1 > 7)) &&
        date.getMonth() === prevDate.getMonth() + 1 &&
        date.getFullYear() === prevDate.getFullYear()
      ) {
        if (length === 0) startDate = prevDate;
        endDate = date;
        length = length + 1;
      } else if (
        //handle year change consecutive dates
        i !== 0 &&
        prevDate.getDate() === 31 &&
        date.getDate() === 1 &&
        date.getMonth() === 0 &&
        prevDate.getMonth() === 11
      ) {
        if (length === 0) startDate = prevDate;
        endDate = date;
        length = length + 1;
      } else {
        //handle if consecutive dates break
        if (prevLength < length) {
          prevLength = length;
          prevStartDate = startDate;
          prevEndDate = endDate;
        }
        length = 0;
      }
    }
    let finalLength = prevLength < length ? length + 1 : prevLength + 1;
    startDate = prevLength < length ? startDate : prevStartDate;
    endDate = prevLength < length ? endDate : prevEndDate;

    if (startDate !== undefined && endDate !== undefined)
      res.render("index", {
        //rendering the max length
        length: finalLength.toString(),
        startDate: `${startDate.getFullYear()}-${
          startDate.getMonth() + 1
        }-${startDate.getDate()}`.toString(),
        endDate: `${endDate.getFullYear()}-${
          endDate.getMonth() + 1
        }-${endDate.getDate()}`.toString(),
      });
    else
      res.render("index", {
        //rendering the max length
        length: finalLength.toString(),
        startDate: dates[0],
        endDate: dates[0],
      });
  }
};

module.exports = maxConsecutiveLogin;
