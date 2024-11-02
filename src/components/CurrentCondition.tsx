import React from "react";
import { ForecastDetails } from "../types";

type CurrentConditionProps = {
  location: {
    name: string;
    region: string;
    lat?: number;
    lon?: number;
  };
  weather: ForecastDetails;
  getLatestLocation: () => void;
};

function CurrentCondition(props: CurrentConditionProps) {
  const { location, weather, getLatestLocation } = props;
  return (
    <div className="grid lg:col-span-4 lg:gap-2 gap-8 rounded-2xl">
      <div className="row-span-1 lg:h-2/3 flex items-center justify-start bg-neutral-800 opacity-75 rounded-full p-2">
        <div className="flex items-center justify-start lg:py-0 px-4 gap-2 text-stone-400 lg:text-lg text-sm font-normal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {location?.name}, {location?.region}
        </div>
        <div className="flex flex-1 px-4 lg:py-0 justify-end text-stone-400 lg:text-lg text-sm font-normal">
          <button
            onClick={getLatestLocation}
            className="group relative flex max-w-max flex-col items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-locate-fixed size-5"
            >
              <line x1="2" x2="5" y1="12" y2="12" />
              <line x1="19" x2="22" y1="12" y2="12" />
              <line x1="12" x2="12" y1="2" y2="5" />
              <line x1="12" x2="12" y1="19" y2="22" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <div className="absolute left-1/2 bottom-7 min-w-max -translate-x-1/2 scale-0 transform text-sm transition-all duration-200 group-hover:scale-100">
              <div className="flex max-w-xs flex-col items-center">
                <div className="text-center font-normal text-sm bg-black/80 p-2 rounded text-white">
                  Use current location
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className="row-span-11 grid grid-flow-row p-4 rounded-2xl backdrop-blur-sm bg-black/20">
        <div className="px-4 lg:flex items-center justify-center">
          <div className="text-center">
            <p className="md:text-7xl font-bold text-4xl md:mb-4 mb-2 text-stone-500">
              {weather.temperatureC}&deg;
            </p>
            <p className="md:text-4xl text-lg text-stone-500 md:mr-6 mr-4">
              {weather.condition?.text}
            </p>
          </div>
        </div>
        <div className="grid grid-flow-row 2xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-2 grid-cols-1 gap-4 p-8">
          <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
            <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs">
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
                className="lucide lucide-thermometer xl:size-6 size-4"
              >
                <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
              </svg>
              Feels like
            </p>
            <div className="px-8 xl:pb-8 pb-4 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
              {weather.feelsLikeC}&deg;
            </div>
          </div>
          <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
            <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs">
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
                className="lucide lucide-cloud-rain-wind xl:size-6 size-4"
              >
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                <path d="m9.2 22 3-7" />
                <path d="m9 13-3 7" />
                <path d="m17 13-3 7" />
              </svg>
              Precipitation
            </p>
            <div className="px-8 xl:pb-8 pb-4 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
              {weather.precipitation}%
            </div>
          </div>
          <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
            <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs">
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
                className="lucide lucide-droplets xl:size-6 size-4"
              >
                <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
                <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
              </svg>
              Humidity
            </p>
            <div className="px-8 xl:pb-8 pb-4 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
              {weather.humidity}%
            </div>
          </div>
          <div className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg">
            <p className="xl:p-4 p-2 flex items-center justify-start gap-1 text-stone-500 xl:text-lg md:text-md text-xs">
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
                className="lucide lucide-eye xl:size-6 size-4"
              >
                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Visibility
            </p>
            <div className="px-8 xl:pb-8 pb-4 text-white 2xl:text-4xl xl:text-2xl lg:text-xl md:text-lg">
              {weather.visibility}km
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentCondition;
export type { ForecastDetails };
