import React, { useCallback, useEffect, useState } from "react";
import { getDateOptions, getTimeString, getUrlFromCdn } from "../utils";
import { getLocation, getWeatherForecast } from "../api";

type Location = {
  lat: number;
  lon: number;
  name: string;
  region: string;
};

type ForecastDetails = {
  isDay?: boolean;
  temperatureC: number;
  temperatureF: number;
  feelsLikeC?: number;
  feelsLikeF?: number;
  condition?: {
    text: string;
    icon: string;
  };
  precipitation?: number;
  humidity?: number;
  visibility?: number;
  windSpeed?: number;
};

type Forecast = {
  current: ForecastDetails;
  days: (ForecastDetails & {
    maxTemperatureC: number;
    minTemperatureC: number;
    maxTemperatureF: number;
    minTemperatureF: number;
    sunrise: string;
    sunset: string;
  })[];
  hours: ForecastDetails[];
};

function Weather() {
  const [location, setLocation] = useState<Location | null>();
  const [forecast, setForecast] = useState<Forecast | null>();

  const handleLocationSuccess = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const locationResponse = await getLocation(latitude, longitude);
    if (locationResponse) {
      Object.keys(locationResponse).forEach((key) => {
        localStorage.setItem(key, locationResponse[key]);
      });
      setLocation(() => ({
        lat: locationResponse.lat,
        lon: locationResponse.lon,
        name: locationResponse.name,
        region: locationResponse.region,
      }));
    }
  };

  const handleLocationError = () => {
    setLocation(null);
  };

  const getLatestLocation = () => {
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      { enableHighAccuracy: true }
    );
  };

  const getCurrentLocation = useCallback(async () => {
    const lastLatitude = localStorage.getItem("lat");
    const lastLongitude = localStorage.getItem("lat");
    const lastLocationName = localStorage.getItem("name");
    const lastRegion = localStorage.getItem("region");
    if (lastLatitude && lastLongitude && lastLocationName && lastRegion) {
      setLocation(() => ({
        lat: Number(lastLatitude),
        lon: Number(lastLongitude),
        region: lastRegion,
        name: lastLocationName,
      }));
    } else {
      getLatestLocation();
    }
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (location) {
      getWeatherForecast(location.lat, location?.lon).then(
        (forecastResponse) => {
          if (forecastResponse) {
            setForecast(() => ({
              current: {
                isDay: forecastResponse.current.is_day,
                temperatureC: Math.round(forecastResponse.current.temp_c),
                temperatureF: Math.round(forecastResponse.current.temp_f),
                feelsLikeC: Math.round(forecastResponse.current.feelslike_c),
                feelsLikeF: Math.round(forecastResponse.current.feelslike_f),
                humidity: forecastResponse.current.humidity,
                precipitation: 80,
                visibility: forecastResponse.current.vis_km,
                windSpeed: forecastResponse.current.wind_kph,
                condition: {
                  text: forecastResponse.current.condition.text,
                  icon: forecastResponse.current.condition.icon,
                },
              },
              days: forecastResponse.forecast.forecastday.map(
                ({ day, astro }: { day: any; astro: any }) => ({
                  temperatureC: Math.round(day.avgtemp_c),
                  temperatureF: Math.round(day.avgtemp_f),
                  maxTemperatureC: Math.round(day.maxtemp_c),
                  minTemperatureC: Math.round(day.mintemp_c),
                  maxTemperatureF: Math.round(day.maxtemp_f),
                  minTemperatureF: Math.round(day.mintemp_f),
                  sunrise: astro.sunrise,
                  sunset: astro.sunset,
                })
              ),
              hours: forecastResponse.forecast.forecastday[0].hour
                .slice(new Date().getHours())
                .map((hour: any) => ({
                  isDay: hour.is_day,
                  temperatureC: Math.round(hour.temp_c),
                  temperatureF: Math.round(hour.temp_f),
                  feelsLikeC: Math.round(hour.feelslike_c),
                  feelsLikeF: Math.round(hour.feelslike_f),
                  humidity: hour.humidity,
                  precipitation: 80,
                  visibility: hour.vis_km,
                  windSpeed: hour.wind_kph,
                  condition: {
                    text: hour.condition.text,
                    icon: hour.condition.icon,
                  },
                })),
            }));
          }
        }
      );
    }
  }, [location]);

  return (
    <div
      className="grid place-items-center min-h-screen w-full bg-cover brightness-200 lg:p-16 p-8"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/bg-rainy.jpg)`,
      }}
    >
      {forecast && (
        <div className="grid lg:grid-cols-12 h-full p-8 gap-4 rounded-3xl backdrop-blur-sm bg-black/20">
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
            <div className="row-span-11 grid grid-rows-2 p-4 rounded-2xl backdrop-blur-sm bg-black/20">
              <div className="px-4 lg:flex items-center justify-center">
                <div className="text-center">
                  <p className="md:text-7xl font-bold text-4xl md:mb-4 mb-2 text-stone-500">
                    {forecast.current.temperatureC}&deg;
                  </p>
                  <p className="md:text-4xl text-lg md:mb-8 mb-2 text-stone-500 md:mr-6 mr-4">
                    {forecast.current.condition?.text}
                  </p>
                  <p className="xl:text-lg lg:text-md text-xs text-white font-light">
                    Today, expect a rainy day with temperatures reaching a
                    maximum of 28°C. Make sure to grab your umbrella and
                    raincoat before heading out.
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
                    {forecast.current.feelsLikeC}&deg;
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
                    {forecast.current.precipitation}%
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
                    {forecast.current.humidity}%
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
                    {forecast.current.visibility}km
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-3 lg:col-span-8 gap-4 rounded-2xl">
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
                {forecast?.hours.map((hourForecast, hour) => (
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
                10-DAY FORECAST
              </p>
              <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
              <div className="grid auto-cols-[6rem] h-full grid-flow-col gap-4 overflow-x-auto whitespace-nowrap no-scrollbar">
                {forecast.days.map((dayForecast, day) => {
                  const { dayOfWeek, date } = getDateOptions(day);
                  return (
                    <div className="flex flex-col justify-center items-center rounded-xl h-full p-2 text-white transition ease-in-out hover:bg-neutral-800">
                      <p className="text-stone-500 mb-1">
                        {day === 0 ? "Today" : dayOfWeek}
                      </p>
                      <p className="text-sm font-thin mb-4 text-stone-400">
                        {date}
                      </p>
                      <p className="text-2xl font-bold mb-2">
                        {dayForecast.temperatureC}&deg;
                      </p>
                      <img
                        src="https://cdn.weatherapi.com/weather/64x64/day/176.png"
                        alt="icon"
                        width="38"
                        height="38"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-4 h-full">
              <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
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
                    className="lucide lucide-haze"
                  >
                    <path d="m5.2 6.2 1.4 1.4" />
                    <path d="M2 13h2" />
                    <path d="M20 13h2" />
                    <path d="m17.4 7.6 1.4-1.4" />
                    <path d="M22 17H2" />
                    <path d="M22 21H2" />
                    <path d="M16 13a4 4 0 0 0-8 0" />
                    <path d="M12 5V2.5" />
                  </svg>
                  SUNRISE
                </p>
                <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
                <span className="text-slate-300">06:13 AM</span>
              </div>
              <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
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
                    className="lucide lucide-haze"
                  >
                    <path d="m5.2 6.2 1.4 1.4" />
                    <path d="M2 13h2" />
                    <path d="M20 13h2" />
                    <path d="m17.4 7.6 1.4-1.4" />
                    <path d="M22 17H2" />
                    <path d="M22 21H2" />
                    <path d="M16 13a4 4 0 0 0-8 0" />
                    <path d="M12 5V2.5" />
                  </svg>
                  SUNSET
                </p>
                <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
                <span className="text-slate-300">Technical advisor</span>
              </div>
              <div className="flex flex-col p-4 rounded-xl backdrop-blur-sm bg-black/40 h-full">
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
                    className="lucide lucide-haze"
                  >
                    <path d="m5.2 6.2 1.4 1.4" />
                    <path d="M2 13h2" />
                    <path d="M20 13h2" />
                    <path d="m17.4 7.6 1.4-1.4" />
                    <path d="M22 17H2" />
                    <path d="M22 21H2" />
                    <path d="M16 13a4 4 0 0 0-8 0" />
                    <path d="M12 5V2.5" />
                  </svg>
                  SUNRISE
                </p>
                <hr className="h-px my-2 bg-stone-500 border-0 opacity-40"></hr>
                <span className="text-slate-300">Technical advisor</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
