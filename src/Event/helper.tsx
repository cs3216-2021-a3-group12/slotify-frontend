import moment from "moment";

export function getTimeDateText(
  start_date_time: number,
  end_date_time: number
) {
  const start = new Date(start_date_time);
  const end = new Date(end_date_time);
  const startMoment = moment(start);
  const endMoment = moment(end);

  if (
    start.getDate() === end.getDate() &&
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  ) {
    return `${startMoment.format("DD MMM")} | ${startMoment.format(
      "ddd"
    )} | ${startMoment.format("H:mmA")} - ${endMoment.format("H:mmA")}`;
  }
  return `${startMoment.format("DD MMM H:mmA")} - ${endMoment.format(
    "DD MMM H:mmA"
  )}`;
}
