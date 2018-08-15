var documentPath;
var clockPath;

// Fitbit does not support process
try {
  // Testing environment
  documentPath = process.env.JEST ?  "../tests/document" : "document";
  clockPath = process.env.JEST ? "../tests/clock" : "clock";
} catch(error) {
  // Production environment
  documentPath = "document";
  clockPath = "clock";
}

const document = require(documentPath);
const clock = require(clockPath);

const busTimes = [
  [7, '00', 'W'],
  [8, '15', 'WE'],
  [9, '15', 'WE'],
  [10, '15', 'WE'],
  [11, '15', 'WE'],
  [12, '15', 'WE'],
  [13, '15', 'WE'],
  [14, '15', 'WE'],
  [15, '15', 'WX-E'],
  [15, '45', 'W'],
  [16, '15', 'E'],
  [16, '15', 'WX'],
  [16, '45', 'W'],
  [17, '00', 'WX'],
  [17, '15', 'E'],
  [17, '20', 'WX'],
  [17, '35', 'WX'],
  [17, '50', 'WX'],
  [18, '05', 'WX'],
  [18, '15', 'E'],
  [18, '20', 'WX'],
  [18, '30', 'WX'],
  [18, '45', 'WX'],
  [19, '00', 'WX'],
  [19, '15', 'WX-E'],
  [19, '45', 'W'],
  [20, '15', 'WX-E'],
  [20, '45', 'W'],
  [21, '15', 'WE'],
  [22, '15', 'W'],
  [23, '00', 'E'],
  [23, '15', 'W']
];

const functions = {
  filterTimes: function (forDay, times) {
    let result = [];
    const day = forDay.getDay();
    const isWeekend = (day === 6) || (day === 0);

    const hours = forDay.getHours();
    const minutes = forDay.getMinutes();

    times.forEach(function (element) {
      const elementMinutes = parseInt(element[1]);
      const elementHours = element[0];

      if ((elementHours > hours) || ((elementHours === hours) && (elementMinutes > minutes))) {
        var attr = element[2];

        let weekendSchedule = /E/.test(attr);
        let weekdaySchedule = /W/.test(attr);

        if (isWeekend) {
          if (weekendSchedule) {
            result.push(element);
          }
        } else {
          if (weekdaySchedule) {
            result.push(element);
          }
        }
      }
    });
    return(result);
  },
  format: function (slot) {
    var express = /X/.test(slot[2]);
    var attr = express ? "X" : "";
    return(`${slot[0]}:${slot[1]} ${attr}`);
  }

}

function display(times) {
  let index = 1;
  times.forEach(function (element) {
    let line = document.getElementById(`line${index}`);
    line.text = functions.format(element);
    index += 1;
  });
};

function clearScreen() {
  let index = 1;
  for (index = 1; index < 8; index++) {
    let line = document.getElementById(`line${index}`);
    line.text = "";
  }
};

clock.granularity = "minutes"; // seconds, minutes, hours
clearScreen();
clock.ontick = () => {
  var results = functions.filterTimes(new Date(), busTimes);
  display(results);
};

// Fitbit does not support module
try {
  module.exports = functions;
} catch(error) { }
