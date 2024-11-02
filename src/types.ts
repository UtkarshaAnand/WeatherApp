export type ForecastDetails = {
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