/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useCallback } from 'react'
import { fetchCurrentWeather, fetchWeatherForecast } from '../utils/apis'

const useWeatherAPI = ({ stationName, locationName, date }) => {
  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    sunRiseTime:'',
    sunSetTime:'',
    isLoading: true,
    loadFailed: false
  })

  const fetchData = useCallback(async () => {
    try {
      setWeatherElement(prevState => ({
        ...prevState,
        isLoading: true
      }))

      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather({ stationName }),
        fetchWeatherForecast({ locationName })
      ])

      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading: false
      })
    } catch (err) {
      setWeatherElement(prevState => ({
        ...prevState,
        loadFailed: true,
        isLoading: false
      }))
      console.error(err)
    }
  }, [stationName, locationName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [weatherElement, fetchData]
}

export default useWeatherAPI