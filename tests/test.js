const functions = require('../app/index');
const helpers = require('./test-helpers');

test('No lines if empty times', () => {
  lines = functions.filterTimes(new Date(), []);
  expect(lines).toBeNull;
});

test('Correctly shows times when the hour is identical', () => {
  currentTime = new Date(2018, 7, 13, 7, 0);
  const times = [
    [6, '00', 'W'],
    [7, '00', 'W'],
    [8, '15', 'WE'],
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
  date = helpers.makeWeekday();

  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('No weekday line when given weekend times', () => {
  let times = [
    [8, '00', 'E'],
  ];

  date = helpers.makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(0);
});

test('Weekday line for common times', () => {
  let times = [
    [8, '00', 'W-E'],
  ];

  date = helpers.makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('Weekday line for express', () => {
  let times = [
    [8, '00', 'WX-E'],
  ];

  date = helpers.makeWeekday();
  lines = functions.filterTimes(date, times);
  expect(functions.format(lines[0], date)).toEqual(expect.stringContaining('X'));
});

test('Weekend line for common times', () => {
  let times = [
    [8, '00', 'W-E'],
  ];

  date = helpers.makeWeekend();
  lines = functions.filterTimes(date, times);
  expect(lines.length).toBe(1);
});

test('Weekend line for express', () => {
  let times = [
    [8, '00', 'W-EX'],
  ];

  date = helpers.makeWeekend();
  lines = functions.filterTimes(date, times);
  expect(functions.format(lines[0], date)).toEqual(expect.stringContaining('X'));
});

test('No express on weekend', () => {
  let times = [
    [15, '15', 'WX-E'],
  ];

  date = helpers.makeWeekend();
  lines = functions.filterTimes(date, times);
  expect(functions.format(lines[0], date)).toEqual(expect.not.stringContaining('X'));
});

test('Displays for non-express', () => {
  let times = [
    [8, '00', 'W-E'],
  ];

  date = helpers.makeWeekday();
  lines = functions.display(times, date);
  expect(/X/.test(lines[0].text)).toBe(false);
});

test('Displays for express', () => {
  let times = [
    [8, '00', 'WX'],
  ];

  date = helpers.makeWeekday();
  lines = functions.display(times, date);
  expect(/X/.test(lines[0].text)).toBe(true);
});
