const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const dateHeader = (date) => {
  // new Date().getFullYear
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export const monthAndDay = (date) => {
  const month = monthNames[parseInt(date.split("-")[1] - 1)];
  let day = date.split("-")[2];
  //   console.log(day.split("")[0]);
  if (day.split("")[0] == "0") {
    // console.log("Came here");
    day = day.replace("0", "");
  }
  return `${month} ${day}`;
};

export const dateToStandard = (date) => {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  if (month.length == 1) {
    month = `0${month}`;
  }
  // alert();
  return `${year}-${month}-${date.getDate()}`;
};
