import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTimeString, getUrlFromCdn } from "../utils";
import { ForecastDetails } from "../types";
import { TemperatureUnit, convertTemperature } from "../utils/helper";

type HourlyForecastProps = {
  hourlyWeather: ForecastDetails[];
  onHourSelect: (hourIndex: number) => void;
  selectedDay: number;
  selectedHour: number;
  temperatureUnit: TemperatureUnit;
};

function HourlyForecast(props: HourlyForecastProps) {
  const {
    hourlyWeather,
    onHourSelect,
    selectedDay,
    selectedHour,
    temperatureUnit,
  } = props;

  const getTemperature = (temp: number | undefined) => {
    if (temp === undefined) return "--";
    return `${
      temperatureUnit === "C" ? temp : convertTemperature(temp, "F")
    }°${temperatureUnit}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 overflow-hidden"
    >
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-start gap-4 label-large text-stone-500"
      >
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
      </motion.p>
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="h-px my-2 bg-stone-500 border-0 opacity-40"
      />
      <div className="grid auto-cols-[6rem] h-full gap-4 grid-flow-col overflow-x-auto whitespace-nowrap no-scrollbar">
        <AnimatePresence>
          {hourlyWeather.map((hourForecast, hour) => (
            <motion.div
              key={hour}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: selectedHour === hour ? 1.05 : 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onHourSelect(hour)}
              className={`flex flex-col justify-center items-center rounded-xl h-full p-2 text-white cursor-pointer ${
                selectedHour !== hour
                  ? "transition ease-in-out lg:hover:bg-neutral-800"
                  : "bg-neutral-800"
              }`}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-4 text-stone-500 body-medium"
              >
                {hour === 0 && selectedDay === 0
                  ? "Now"
                  : getTimeString(selectedDay, hour)}
              </motion.p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="body-medium font-medium mb-2"
              >
                {getTemperature(hourForecast.temperatureC)}
              </motion.p>
              <motion.img
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                }}
                src={getUrlFromCdn(hourForecast.condition?.icon) ?? ""}
                alt="icon"
                width="38"
                height="38"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default HourlyForecast;
