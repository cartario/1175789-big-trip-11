import moment from "moment";

export const formatDate = (date) => {
  return moment(date).format(`L`);
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const convertData = (dateString) => {
  const monthIndex = dateString[3] + dateString[4];
  const dayIndex = dateString[0] + dateString[1];
  return `${monthIndex}/${dayIndex}${dateString.slice(5)}`;
};

export const getFormattedTimeDuration = (startDate, endDate) => {
  const difference = moment(endDate).diff(moment(startDate));
  return moment(difference).format(`DDD[D] H[H] mm[M]`);
};

export const dayCounterFormat = (date) => {
  return date.getMonth();
};

export const getDuration = (first, second) => {
  const diff = moment(second).diff(moment(first));
  return moment.duration(diff);
};
