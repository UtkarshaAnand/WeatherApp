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
            setForecast(() => ({
              current: {
                isDay: forecastResponse.current.is_day,
                temperatureC: Math.round(forecastResponse.current.temp_c),
                temperatureF: Math.round(forecastResponse.current.temp_f),
                feelsLikeC: Math.round(forecastResponse.current.feelslike_c),
                feelsLikeF: Math.round(forecastResponse.current.feelslike_f),
                humidity: forecastResponse.current.humidity,
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
                  precipitation: day.daily_chance_of_rain,
                  condition: {
                    text: day.condition.text,
                    icon: day.condition.icon,
                  },
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
      {location && forecast && (
        <div className="grid lg:grid-cols-12 h-full p-8 gap-4 rounded-3xl backdrop-blur-sm bg-black/20">
          <CurrentCondition
            weather={{
              ...forecast.current,
              precipitation: forecast.days[0].precipitation,
            }}
            getLatestLocation={getLatestLocation}
            location={location}
          />
          <div className="grid grid-flow-row lg:col-span-8 gap-4 rounded-2xl">
            <HourlyForecast hourlyWeather={forecast.hours} />
            <DailyForecast dailyWeather={forecast.days} />
            <AstroAndWind
              sunrise={forecast.days[0].sunrise}
              sunset={forecast.days[0].sunset}
              windSpeed={forecast.current.windSpeed ?? 0}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
