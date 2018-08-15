const functions = require('../app/index');

test('No lines if empty times', () => {
  lines = functions.filterTimes(new Date(), []);
  expect(lines).toBeNull;
});

test('Correctly shows times when the hour is identical', () => {
  currentTime = new Date(2018, 7, 13, 7, 0);
  let times = [
    [7, '00', 'W'],
  ];

  lines = functions.filterTimes(currentTime, times);
  expect(lines.length).toBe(1);
});

test('Correctly shows times when the hour is identical but minutes in the past', () => {
  currentTime = new Date(2018, 7, 13, 7, 15);
  let times = [
    [7, '00', 'W'],
  ];

  lines = functions.filterTimes(currentTime, times);
  expect(lines.length).toBe(0);
});

test('Correctly shows times when the hour is identical but minutes in the future', () => {
  currentTime = new Date(2018, 7, 13, 7, 15);
  let times = [
    [7, '20', 'W'],
  ];

  lines = functions.filterTimes(currentTime, times);
  expect(lines.length).toBe(1);
});



test('Weekday line when given times', () => {
  let times = [
    [8, '00', 'W'],
  ];
  date = makeWeekday();

  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('No weekday line when given weekend times', () => {
  let times = [
    [8, '00', 'E'],
  ];

  date = makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(0);
});

test('Weekday line for common times', () => {
  let times = [
    [8, '00', 'W-E'],
  ];

  date = makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('Weekday line for express', () => {
  let times = [
    [8, '00', 'WX-E'],
  ];

  date = makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(functions.format(lines)).toContain('X')
});

test('Weekend line for common times', () => {
  let times = [
    [8, '00', 'W-E'],
  ];

  date = makeWeekend();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('Weekend line for express', () => {
  let times = [
    [8, '00', 'W-EX'],
  ];

  date = makeWeekend();
  lines = functions.filterTimes(date, times);
  expect(functions.format(lines)).toContain('X')
});

function makeWeekday() {
  return(new Date(2018, 7, 13, 7, 0));
}

function makeWeekend() {
  return(new Date(2018, 7, 12, 7, 0));
}
