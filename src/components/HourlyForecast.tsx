import React from "react";
import { getTimeString, getUrlFromCdn } from "../utils";
import { ForecastDetails } from "../types";

type HourlyForecastProps = {
  hourlyWeather: ForecastDetails[];
};

function HourlyForecast(props: HourlyForecastProps) {
  const { hourlyWeather } = props;
  return (
    <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 overflow-hidden">
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
          className="lucide lucide-clock"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        HOURLY FORECAST
      </p>
      <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
      <div className="grid auto-cols-[6rem] h-full gap-4 grid-flow-col overflow-x-auto whitespace-nowrap no-scrollbar">
        {hourlyWeather.map((hourForecast, hour) => (
          <div className="flex flex-col justify-center items-center rounded-xl h-full p-2 text-white transition ease-in-out hover:bg-neutral-800">
            <p className="mb-4 text-stone-500">
              {hour === 0 ? "Now" : getTimeString(hour)}
            </p>
            <p className="text-2xl font-bold mb-2">
              {hourForecast.temperatureC}&deg;
            </p>
            <img
              src={getUrlFromCdn(hourForecast.condition?.icon) ?? ""}
              alt="icon"
              width="38"
              height="38"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
