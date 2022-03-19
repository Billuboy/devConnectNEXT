export default function dateParse(timestamp) {
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
