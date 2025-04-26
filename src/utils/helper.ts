export type TemperatureUnit = 'C' | 'F';

export const convertTemperature = (temp: number, to: TemperatureUnit): number => {
  if (to === 'F') {
    // Convert Celsius to Fahrenheit
    return Math.round((temp * 9 / 5) + 32);
  }
  // Convert Fahrenheit to Celsius
  return Math.round((temp - 32) * 5 / 9);
};

export const formatTemperature = (temp: number | undefined, unit: TemperatureUnit): string => {
  if (temp === undefined) return '--°';
  return `${temp}°${unit}`;
};