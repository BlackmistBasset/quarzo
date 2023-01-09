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
  } else if (date.getDate() === 31) {
    day = 1;
  }
  if (date.getMonth() + 1 < 10 && date.getMonth() + 1 > 0) {
    month = `0${date.getMonth() + 1}`;
  } else if (date.getMonth() + 1 >= 10 && date.getMonth() !== 11) {
    month = date.getMonth() + 1;
  } else if (date.getMonth() === 11) {
    month = 1;
  }

  correctedDate = `${day}/${month}/${date.getFullYear()}`;
  return correctedDate;
};

export const agregarUnDia = (date) => {
  let fecha = new Date(date);

  let day, month;
  if (fecha.getDate() < 10 && fecha.getDate() > 0) {
    day = `0${fecha.getDate() + 1}`;
  } else if (fecha.getDate() >= 10 && fecha.getDate() !== 31) {
    day = fecha.getDate() + 1;
  } else if (fecha.getDate() === 31) {
    day = 1;
  }

  if (fecha.getMonth() + 1 < 10 && fecha.getMonth() + 1 > 0) {
    month = `0${fecha.getMonth() + 1}`;
  } else if (fecha.getMonth() + 1 >= 10 && fecha.getMonth() !== 11) {
    month = fecha.getMonth() + 1;
  } else if (fecha.getMonth() === 11) {
    month = 1;
  }

  const parsedDate = `${day}/${month}/${fecha.getFullYear()} `;
  return parsedDate;
};
