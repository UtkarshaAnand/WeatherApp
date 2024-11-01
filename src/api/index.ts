const getWeatherForecast = async (latitude: number, longitude: number) => {
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=23c0fe0382de4734906170550242507&q=${latitude} ${longitude}&days=10&aqi=no&alerts=no`);
  return response.json();
}

const getLocation = async (latitude: number, longitude: number) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=23c0fe0382de4734906170550242507&q=${latitude} ${longitude}`)
    const responseJson = await response.json();
    return responseJson[0];
  }
  catch (err) {
    throw new Error('Could not get current location');
  }
}

export { getWeatherForecast, getLocation }