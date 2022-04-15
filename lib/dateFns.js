export function parseDate(timestamp) {
  let date = new Date(timestamp).toLocaleDateString();
  let time = new Date(timestamp).toLocaleTimeString();
  const splitTime = time.split(':');
  const splitDate = date.split('/');

  date = splitDate.join('-');
  if (parseInt(splitTime[0], 10) > 12)
    time = `${parseInt(splitTime[0], 10) % 12}:${splitTime[1]} PM`;
  else time = `${splitTime[0]}:${splitTime[1]} AM`;

  return { date, time };
}

export function compareDate(d1, d2, compareType) {
  const newD1 = +new Date(d1);
  const newD2 = +new Date(d2);

  if (compareType === 'ge') return newD1 - newD2 >= 0;
  if (compareType === 'g') return newD1 - newD2 > 0;
  return newD1 === newD2;
}
