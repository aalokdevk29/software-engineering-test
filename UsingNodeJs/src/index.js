const express = require("express");
const { spawn } = require("child_process");
const helpers = require("../utility/helpers");
const maxConsecutiveLogin = require("./fetchingConsecutiveLoginDetails");

const app = express();
const port = 3000;

app.set("view engine", "hbs");

app.get("/", (req, res) => { 
  var datesArray;

  const python = spawn("python", ["../seed.py"]); //fetching data from seed.py file
  python.stdout.on("data", function (data) {
    datesArray = data.toString();
  });

  python.on("close", (code) => {
    var arrayOfDates = helpers.stringIntoObject(datesArray);
    var dates = helpers.removeSameElements(arrayOfDates);
    maxConsecutiveLogin(dates, res);
  });
});

app.listen(port, () => {
  console.log(`server runs on port no. ${port}`);
});
