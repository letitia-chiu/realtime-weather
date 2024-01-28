
const API_BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/'
const KEY = process.env.REACT_APP_API_KEY_2
const STATION_NAME = '臺北'
const LOCATION_NAME = '臺北市'

const API_OBSERVATION = `${API_BASE_URL}O-A0003-001?Authorization=${KEY}&StationName=${STATION_NAME}`
const API_FORECAST = `${API_BASE_URL}F-C0032-001?Authorization=${KEY}&locationName=${LOCATION_NAME}`
const API_SUN = `${API_BASE_URL}A-B0062-001?Authorization=${KEY}&CountyName=${LOCATION_NAME}`

const fetchCurrentWeather = () => {    
    
  return fetch(API_OBSERVATION)
    .then(res => res.json())
    .then(result => {
      const stationData = result.records.Station[0]
     
      console.log('Fetch current weather successfully')
      return {
        observationTime: stationData.ObsTime.DateTime,
        temperature: stationData.WeatherElement.AirTemperature,
        windSpeed: stationData.WeatherElement.WindSpeed
      }
    })
    .catch(err => {
      console.warn('Failed to fetch current weather')
      throw err
    })
}

const fetchWeatherForecast = () => {
  return fetch(API_FORECAST)
    .then(res => res.json())
    .then(result => {
      const locationData = result.records.location[0]
      const weatherElements = locationData.weatherElement.reduce(
        (neededElements, item) => {
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            neededElements[item.elementName] = item.time[0].parameter
          }
          return neededElements
        }, {}
      )

      console.log('Fetch weather forecast successfully')
      return {
        locationName: locationData.locationName,
        description: weatherElements.Wx.parameterName,
        weatherCode: weatherElements.Wx.parameterValue,
        rainPossibility: weatherElements.PoP.parameterName,
        comfortability: weatherElements.CI.parameterName
      }
    })
    .catch(err => {
      console.warn('Failed to fetch weather forecast')
      throw err
    })
}

const fetchSunTime = date => {
  const dateParam = date ? `&Date=${date}` : ''

  return fetch(API_SUN + dateParam)
    .then(res => res.json())
    .then(result => {
      const sunData = result.records.locations.location[0].time[0]

      console.log('Fetch sun time successfully')
      return {
        sunRiseTime: sunData.SunRiseTime,
        sunSetTime: sunData.SunSetTime
      }
    })
    .catch(err => {
      console.warn('Failed to fetch sun time')
      throw err
    })
}

export { fetchCurrentWeather, fetchWeatherForecast, fetchSunTime }