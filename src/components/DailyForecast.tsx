import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getDateOptions, getUrlFromCdn } from "../utils";
import { ForecastDetails } from "../types";
import { TemperatureUnit, convertTemperature } from "../utils/helper";

type DailyForecastProps = {
  dailyWeather: ForecastDetails[];
  onDaySelect: (dayIndex: number) => void;
  selectedDay: number;
  temperatureUnit: TemperatureUnit;
  onTemperatureUnitChange: (unit: TemperatureUnit) => void;
};

function DailyForecast(props: DailyForecastProps) {
  const {
    dailyWeather,
    onDaySelect,
    selectedDay,
    temperatureUnit,
    onTemperatureUnitChange,
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
      className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full overflow-hidden"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-2"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-stone-500"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          <span className="text-stone-500 label-large">3-DAY FORECAST</span>
        </div>
        <motion.button
          onClick={() =>
            onTemperatureUnitChange(temperatureUnit === "C" ? "F" : "C")
          }
          className="text-stone-400 body-medium hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          °{temperatureUnit}
        </motion.button>
      </motion.div>
      <motion.hr
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        className="h-px mb-4 bg-stone-500 border-0 opacity-40"
      />
      <div className="grid auto-cols-[minmax(10rem,1fr)] lg:auto-cols-[minmax(8rem,1fr)] h-full grid-flow-col gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
        <AnimatePresence>
          {dailyWeather.map((dayForecast, day) => {
            const { dayOfWeek, date } = getDateOptions(day);
            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: selectedDay === day ? 1.02 : 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDaySelect(day)}
                className={`flex flex-col rounded-xl h-full p-3 text-white cursor-pointer transition-colors duration-200 ${
                  selectedDay !== day
                    ? "hover:bg-neutral-800/50"
                    : "bg-neutral-800"
                }`}
              >
                <div className="flex flex-col mb-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-stone-300 body-large"
                  >
                    {day === 0 ? "Today" : day === 1 ? "Tomorrow" : dayOfWeek}
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="body-small text-stone-400"
                  >
                    {date}
                  </motion.p>
                </div>

                <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-2 gap-1 mb-2">
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
                    src={getUrlFromCdn(dayForecast.condition?.icon)}
                    alt={dayForecast.condition?.text}
                    width="40"
                    height="40"
                    className="object-contain"
                  />
                  <motion.p
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="lg:heading-small body-large font-bold"
                  >
                    {getTemperature(dayForecast.maxTemperatureC)}
                  </motion.p>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="body-small text-stone-300 line-clamp-2 h-8 lg:text-center text-left"
                >
                  {dayForecast.condition?.text}
                </motion.p>

                <div className="flex items-center justify-between mt-auto pt-2 text-stone-400">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <span className="lg:label-small label-small">
                      {getTemperature(dayForecast.maxTemperatureC)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    <span className="lg:label-small label-small">
                      {getTemperature(dayForecast.minTemperatureC)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default DailyForecast;
