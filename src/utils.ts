import { DaysOfWeek } from "./constants";

const getTimeString = (currentHour: number) => {
  const hours = new Date(
    new Date().getTime() + currentHour * 60 * 60 * 1000
  ).getHours();
  if (hours >= 10) return `${hours}:00`;
  return `0${hours}:00`
}

const getDateOptions = (currentDay: number) => {
  const dayOfWeek = DaysOfWeek[new Date(new Date().getTime() + currentDay * 24 * 60 * 60 * 1000).getDay()];
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "numeric",
  }).format(new Date().getTime() + currentDay * 24 * 60 * 60 * 1000);
  return {
    dayOfWeek, date
  }
}

const getUrlFromCdn = (cdnUrl?: string) => `http://${cdnUrl}`;

export { getTimeString, getDateOptions, getUrlFromCdn }