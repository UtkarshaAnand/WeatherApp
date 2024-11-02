import React from "react";
import { getDateOptions, getUrlFromCdn } from "../utils";
import { ForecastDetails } from "../types";

type DailyForecastProps = {
  dailyWeather: ForecastDetails[];
};

function DailyForecast(props: DailyForecastProps) {
  const { dailyWeather } = props;
  return (
    <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full overflow-hidden">
      <p className="flex items-center justify-start gap-4 text-stone-500 xl:text-lg md:text-md text-xs">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-calendar"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect width="18" height="18" x="3" y="4" rx="2" />
          <path d="M3 10h18" />
        </svg>
        3-DAY FORECAST
      </p>
      <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
      <div className="grid auto-cols-[6rem] h-full grid-flow-col gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
        {dailyWeather.map((dayForecast, day) => {
          const { dayOfWeek, date } = getDateOptions(day);
          return (
            <div className="flex flex-col justify-center items-center rounded-xl h-full p-2 text-white transition ease-in-out hover:bg-neutral-800">
              <p className="text-stone-500 mb-1">
                {day === 0 ? "Today" : dayOfWeek}
              </p>
              <p className="text-sm font-thin mb-4 text-stone-400">{date}</p>
              <p className="text-2xl font-bold mb-2">
                {dayForecast.temperatureC}&deg;
              </p>
              <img
                src={getUrlFromCdn(dayForecast.condition?.icon)}
                alt="icon"
                width="38"
                height="38"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DailyForecast;
