export const parseDate = (date) => {
  let day, month, correctedDate;
  if (date.getDate() < 10 && date.getDate() > 0) {
    day = `0${date.getDate()}`;
  } else if (date.getDate() >= 10) {
    day = date.getDate();
  }
  if (date.getMonth() + 1 < 10 && date.getMonth() + 1 > 0) {
    month = `0${date.getMonth() + 1}`;
  } else if (date.getMonth() + 1 >= 10) {
    month = date.getMonth() + 1;
  }

  correctedDate = `${day}/${month}/${date.getFullYear()}`;

  return correctedDate;
};

export const parseFechaDeCompraEdit = (date) => {
  let correctedDate, month, day;

  if (date.getDate() < 10 && date.getDate() > 0) {
    day = `0${date.getDate() + 1}`;
  } else if (date.getDate() >= 10) {
    day = date.getDate() + 1;
  }
  if (date.getMonth() + 1 < 10 && date.getMonth() + 1 > 0) {
    month = `0${date.getMonth() + 1}`;
  } else if (date.getMonth() + 1 >= 10) {
    month = date.getMonth() + 1;
  }

  correctedDate = `${day}/${month}/${date.getFullYear()}`;
  return correctedDate;
};
