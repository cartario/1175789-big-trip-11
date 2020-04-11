const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : value;
};

const getDateTimeFormat = (date) => {
  return `${date.getFullYear()}-${castTimeFormat(1 + date.getMonth())}-${date.getDate()}`;
};

const getTimeFormat = (date) => {
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

export {getDateTimeFormat, getTimeFormat};
