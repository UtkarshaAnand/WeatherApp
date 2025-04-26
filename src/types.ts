export interface ForecastDetails {
  temperatureC?: number;
  feelsLikeC?: number;
  maxTemperatureC?: number;
  minTemperatureC?: number;
  condition?: {
    text: string;
    icon: string;
    code: number;
  };
  time?: string;
  date?: string;
  isDay?: boolean;
  precipitation?: number;
  humidity?: number;
  visibility?: number;
  windSpeed?: number;
}