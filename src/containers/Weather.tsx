import React, { useCallback, useEffect, useState } from "react";
import { getLocation, getWeatherForecast } from "../api";
import {
  CurrentCondition,
  AstroAndWind,
  DailyForecast,
  HourlyForecast,
} from "../components/";
import { ForecastDetails } from "../types";

type Location = {
  lat: number;
  lon: number;
  name: string;
  region: string;
};

type Forecast = (ForecastDetails & {
  maxTemperatureC: number;
  minTemperatureC: number;
  maxTemperatureF: number;
  minTemperatureF: number;
  sunrise: string;
  sunset: string;
  hours: ForecastDetails[];
})[];

function Weather() {
  const [location, setLocation] = useState<Location | null>();
  const [forecast, setForecast] = useState<Forecast | null>();
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);

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

  const getLatestLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      { enableHighAccuracy: true }
    );
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const lastLatitude = localStorage.getItem("lat");
    const lastLongitude = localStorage.getItem("lon");
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
  }, [getLatestLocation]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  useEffect(() => {
    if (location) {
      getWeatherForecast(location.lat, location?.lon).then(
        (forecastResponse) => {
          if (forecastResponse) {
            setForecast(() =>
              forecastResponse.forecast.forecastday.map(
                (
                  { day, astro, hour }: { day: any; astro: any; hour: any },
                  index: number
                ) => {
                  const currentHours =
                    index === 0 ? hour.slice(new Date().getHours()) : hour;
                  return {
                    temperatureC: Math.round(day.avgtemp_c),
                    temperatureF: Math.round(day.avgtemp_f),
                    maxTemperatureC: Math.round(day.maxtemp_c),
                    minTemperatureC: Math.round(day.mintemp_c),
                    maxTemperatureF: Math.round(day.maxtemp_f),
                    minTemperatureF: Math.round(day.mintemp_f),
                    precipitation: day.daily_chance_of_rain,
                    condition: {
                      text: day.condition.text,
                      icon: day.condition.icon,
                    },
                    sunrise: astro.sunrise,
                    sunset: astro.sunset,
                    hours: currentHours.map((h: any) => ({
                      isDay: h.is_day,
                      temperatureC: Math.round(h.temp_c),
                      temperatureF: Math.round(h.temp_f),
                      feelsLikeC: Math.round(h.feelslike_c),
                      feelsLikeF: Math.round(h.feelslike_f),
                      humidity: h.humidity,
                      precipitation: h.chance_of_rain,
                      visibility: h.vis_km,
                      windSpeed: h.wind_kph,
                      condition: {
                        text: h.condition.text,
                        icon: h.condition.icon,
                      },
                    })),
                  };
                }
              )
            );
          }
        }
      );
    }
  }, [location]);

  const getBackgroundImage = useCallback(() => {
    if (forecast) {
      if (forecast[selectedDay].hours[selectedHour].isDay) return "bg-sunny";
      return "bg-rainy";
    }
  }, [forecast, selectedDay, selectedHour]);

  const handleHourSelection = useCallback((hourIndex: number) => {
    setSelectedHour(hourIndex);
  }, []);

  const handleDaySelection = useCallback((dayIndex: number) => {
    setSelectedDay(dayIndex);
    setSelectedHour(0);
  }, []);

  return (
    location &&
    forecast && (
      <div
        className="grid place-items-center min-h-screen w-full bg-cover brightness-200 lg:p-16 p-8 overflow-hidden"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL
          }/${getBackgroundImage()}.jpg)`,
        }}
      >
        <div className="grid lg:grid-cols-12 h-full w-full lg:p-8 p-4 gap-4 rounded-3xl backdrop-blur-sm bg-black/20">
          <CurrentCondition
            weather={forecast[selectedDay].hours[selectedHour]}
            getLatestLocation={getLatestLocation}
            location={location}
          />
          <div className="grid grid-flow-row lg:col-span-8 gap-4 rounded-2xl">
            <HourlyForecast
              hourlyWeather={forecast[selectedDay].hours}
              onHourSelect={handleHourSelection}
              selectedDay={selectedDay}
              selectedHour={selectedHour}
            />
            <DailyForecast
              dailyWeather={forecast}
              onDaySelect={handleDaySelection}
              selectedDay={selectedDay}
            />
            <AstroAndWind
              sunrise={forecast[selectedDay].sunrise}
              sunset={forecast[selectedDay].sunset}
              windSpeed={
                forecast[selectedDay].hours[selectedHour].windSpeed ?? 0
              }
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Weather;
