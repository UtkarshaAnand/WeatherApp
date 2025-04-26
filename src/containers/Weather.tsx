import React, { useCallback, useEffect, useState } from "react";
import { getLocation, getWeatherForecast } from "../api";
import {
  CurrentCondition,
  AstroAndWind,
  DailyForecast,
  HourlyForecast,
} from "../components/";
import { ForecastDetails } from "../types";
import { TemperatureUnit } from "../utils/helper";

type Location = {
  lat: number;
  lon: number;
  name: string;
  region: string;
};

type Forecast = (ForecastDetails & {
  maxTemperatureC: number;
  minTemperatureC: number;
  sunrise: string;
  sunset: string;
  hours: (ForecastDetails & { timeEpoch: number })[];
})[];

function Weather() {
  const [location, setLocation] = useState<Location | null>();
  const [forecast, setForecast] = useState<Forecast | null>();
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>("C");

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
                      timeEpoch: h.time_epoch,
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

  const handleHourSelection = useCallback(
    (hourIndex: number) => {
      const hoursRemaining = 24 - new Date().getHours();
      if (hourIndex >= hoursRemaining && selectedDay === 0) {
        setSelectedDay(1);
        setSelectedHour(hourIndex - hoursRemaining);
      } else setSelectedHour(hourIndex);
    },
    [selectedDay]
  );

  const handleDaySelection = useCallback((dayIndex: number) => {
    setSelectedDay(dayIndex);
  }, []);

  const getHours = useCallback(
    (forecast: Forecast) => {
      if (selectedDay === 0) {
        const hoursRemaining = 24 - forecast[selectedDay].hours.length;
        return forecast[selectedDay].hours.concat(
          forecast[1].hours.slice(0, hoursRemaining)
        );
      }
      return forecast[selectedDay].hours;
    },
    [selectedDay]
  );

  return (
    location &&
    forecast && (
      <div
        className="relative grid place-items-center min-h-screen w-full bg-cover brightness-200 overflow-hidden"
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL
          }/${getBackgroundImage()}.jpg)`,
        }}
      >
        <div className="relative grid lg:grid-cols-12 h-full w-full lg:p-8 p-4 gap-4 backdrop-blur-sm bg-black/20">
          <CurrentCondition
            weather={{
              ...forecast[selectedDay].hours[selectedHour],
              minTemperatureC: forecast[selectedDay].minTemperatureC,
              maxTemperatureC: forecast[selectedDay].maxTemperatureC,
            }}
            getLatestLocation={getLatestLocation}
            location={location}
            temperatureUnit={temperatureUnit}
            onTemperatureUnitChange={setTemperatureUnit}
          />
          <div className="grid grid-flow-row lg:col-span-8 gap-4 rounded-2xl">
            <HourlyForecast
              hourlyWeather={getHours(forecast)}
              onHourSelect={handleHourSelection}
              selectedDay={selectedDay}
              selectedHour={selectedHour}
              temperatureUnit={temperatureUnit}
            />
            <DailyForecast
              dailyWeather={forecast}
              onDaySelect={handleDaySelection}
              selectedDay={selectedDay}
              temperatureUnit={temperatureUnit}
              onTemperatureUnitChange={setTemperatureUnit}
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
