import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ForecastDetails } from "../types";
import { TemperatureUnit, convertTemperature } from "../utils/helper";

type CurrentConditionProps = {
  location: {
    name: string;
    region: string;
    lat?: number;
    lon?: number;
  };
  weather: ForecastDetails & {
    maxTemperatureC: number;
    minTemperatureC: number;
  };
  getLatestLocation: () => void;
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
};

function CurrentCondition(props: CurrentConditionProps) {
  const {
    location,
    weather,
    getLatestLocation,
    temperatureUnit,
    onTemperatureUnitChange,
  } = props;

  const getTemperature = (temp: number) => {
    return temperatureUnit === "C" ? temp : convertTemperature(temp, "F");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid lg:col-span-4 lg:gap-2 gap-8 rounded-2xl"
    >
      <div className="row-span-1 flex items-center justify-between gap-2">
        <motion.div
          className="flex-1 flex items-center justify-between bg-neutral-800 opacity-75 rounded-full p-2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div className="flex items-center justify-start lg:py-0 px-4 gap-2 text-stone-400 lg:text-lg text-sm font-normal overflow-hidden">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
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
            </motion.svg>
            <motion.span
              key={`${location?.name}-${location?.region}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="body-large truncate"
            >
              {location?.name}, {location?.region}
            </motion.span>
          </div>
          <motion.button
            onClick={getLatestLocation}
            className="group relative flex max-w-max flex-col items-center justify-center px-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-locate-fixed size-5"
              whileHover={{ rotate: 180 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              <line x1="2" x2="5" y1="12" y2="12" />
              <line x1="19" x2="22" y1="12" y2="12" />
              <line x1="12" x2="12" y1="2" y2="5" />
              <line x1="12" x2="12" y1="19" y2="22" />
              <circle cx="12" cy="12" r="7" />
              <circle cx="12" cy="12" r="3" />
            </motion.svg>
            <div className="absolute left-1/2 bottom-7 min-w-max -translate-x-1/2 scale-0 transform text-sm transition-all duration-200 md:group-hover:scale-100">
              <div className="text-center font-normal text-sm bg-black/80 p-2 rounded text-white">
                Use current location
              </div>
            </div>
          </motion.button>
        </motion.div>
        <motion.button
          onClick={() =>
            onTemperatureUnitChange(temperatureUnit === "C" ? "F" : "C")
          }
          className="flex items-center justify-center px-4 py-2 bg-neutral-800 opacity-75 rounded-full text-stone-400 body-medium hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          °{temperatureUnit}
        </motion.button>
      </div>
      <motion.div className="row-span-11 grid grid-flow-row pt-4 rounded-2xl backdrop-blur-sm bg-black/20">
        <div className="px-4 lg:flex items-center justify-center">
          <div className="text-center">
            <motion.p
              key={`${weather.temperatureC}-${temperatureUnit}`}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="display-medium text-stone-500"
            >
              {weather.temperatureC && getTemperature(weather.temperatureC)}
              &deg;{temperatureUnit}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="body-large text-stone-400 flex items-center justify-center gap-4 mb-2"
            >
              <motion.span
                key={`max-${weather.maxTemperatureC}-${temperatureUnit}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up"
                >
                  <path d="m5 12 7-7 7 7" />
                  <path d="M12 19V5" />
                </svg>
                {getTemperature(weather.maxTemperatureC)}&deg;
              </motion.span>
              <motion.span
                key={`min-${weather.minTemperatureC}-${temperatureUnit}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-down"
                >
                  <path d="M12 5v14" />
                  <path d="m19 12-7 7-7-7" />
                </svg>
                {getTemperature(weather.minTemperatureC)}&deg;
              </motion.span>
            </motion.div>
            <motion.p
              key={weather.condition?.text}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="heading-small text-stone-500"
            >
              {weather.condition?.text}
            </motion.p>
          </div>
        </div>
        <div className="grid grid-flow-row grid-cols-2 gap-4 p-4">
          {[
            {
              label: "Feels like",
              value: `${
                weather.feelsLikeC ? getTemperature(weather.feelsLikeC) : "--"
              }°${temperatureUnit}`,
              icon: (
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
              ),
            },
            {
              label: "Precipitation",
              value: `${weather.precipitation}%`,
              icon: (
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
              ),
            },
            {
              label: "Humidity",
              value: `${weather.humidity}%`,
              icon: (
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
              ),
            },
            {
              label: "Visibility",
              value: `${weather.visibility}km`,
              icon: (
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
              ),
            },
          ].map((item, index) => (
            <div
              key={item.label}
              className="rounded-xl backdrop-blur-sm bg-black/40 shadow-lg flex p-2 flex-col h-full"
            >
              <div className="flex items-center justify-start gap-1 text-stone-500 label-large">
                {item.icon}
                {item.label}
              </div>
              <motion.hr className="h-px my-2 bg-stone-500 border-0 opacity-40" />
              <motion.div
                key={`${item.label}-${item.value}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="flex flex-col h-full text-center justify-center text-white heading-small"
              >
                {item.value}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CurrentCondition;
export type { ForecastDetails };
