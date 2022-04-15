import { compareDate } from '@lib/dateFns';

const findFirstIndex = (data, timestamp, first, last) => {
  let middle;
  if (compareDate(timestamp, data[first][data[first].length - 1].date, 'ge'))
    return first;

  if (
    compareDate(
      data[last - 1][data[last - 1].length - 1].date,
      timestamp,
      'ge'
    ) &&
    compareDate(timestamp, data[last][data[last].length - 1].date, 'ge')
  )
    return last;

  if (
    compareDate(
      data[first][data[first].length - 1].date,
      data[last][data[last].length - 1].date,
      'ge'
    )
  ) {
    middle = Math.floor((first + last) / 2);
    if (
      compareDate(
        data[middle - 1][data[middle - 1].length - 1].date,
        timestamp,
        'ge'
      ) &&
      compareDate(timestamp, data[middle][data[middle].length - 1].date, 'ge')
    )
      return middle;

    if (compareDate(data[middle][data[middle].length - 1].date, timestamp, 'g'))
      return findFirstIndex(data, timestamp, middle + 1, last);

    return findFirstIndex(data, timestamp, first, middle - 1);
  }

  return -1;
};

const findSecondIndex = (data, timestamp, first, last) => {
  let middle;
  if (compareDate(data[first].date, data[last].date, 'ge')) {
    middle = Math.floor((first + last) / 2);

    if (compareDate(data[middle].date, timestamp, 'e')) return middle;
    if (compareDate(data[middle].date, timestamp, 'g'))
      return findSecondIndex(data, timestamp, middle + 1, last);
    return findSecondIndex(data, timestamp, first, middle - 1);
  }

  return -1;
};

export default function useBinSearch(data, timestamp) {
  const fIndex = findFirstIndex(data, timestamp, 0, data.length - 1);
  const sIndex = findSecondIndex(
    data[fIndex],
    timestamp,
    0,
    data[fIndex].length - 1
  );
  return [fIndex, sIndex];
}
