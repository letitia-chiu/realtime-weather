/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'
import { ReactComponent as WarningIcon } from './images/warning.svg'

import styled from '@emotion/styled'

import dayjs from 'dayjs'

const API_BASE_URL = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/'
const KEY = process.env.REACT_APP_API_KEY
const STATION_NAME = '臺北'
const LOCATION_NAME = '臺北市'

const API_OBSERVATION = `${API_BASE_URL}O-A0003-001?Authorization=${KEY}&StationName=${STATION_NAME}`
const API_FORECAST = `${API_BASE_URL}F-C0032-001?Authorization=${KEY}&locationName=${LOCATION_NAME}`

const Card = styled.div`
  position: relative;
  padding: 30px 15px;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  border-radius: 7px;
`
const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`
const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`
const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`
const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`
const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`
const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`
const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`
const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`
const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => isLoading ? '1.5s' : '0s'};
  }

  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg)
    }
  }
`

export default function WeatherCard(props) {

  const [currentWeather, setCurrentWeather] = useState({
    locationName: '臺北市',
    description: '多雲時晴',
    windSpeed: 1.1,
    temperature: 23.7,
    rainPossibility: 60,
    observationTime: '2020-12-10 22:10:00',
    isLoading: true,
    loadFailed: false
  })

  const fetchCurrentWeather = () => {    
    setCurrentWeather(prevState => ({
      ...prevState,
      isLoading: true
    }))
    
    Promise.all([
      fetch(API_OBSERVATION),
      fetch(API_FORECAST)
    ])
    .then(responses => {
      return Promise.all(responses.map(res => res.json()))
    })
    .then(([data1, data2]) => {
      const obs = data1.records.Station[0]
      const fc = data2.records.location[0]

      const weatherData = {
        locationName: fc.locationName,
        description: obs.WeatherElement.Weather,
        windSpeed: obs.WeatherElement.WindSpeed,
        temperature: obs.WeatherElement.AirTemperature,
        rainPossibility: fc.weatherElement[1].time[0].parameter.parameterName,
        observationTime: obs.ObsTime.DateTime,
        isLoading: false,
        loadFailed: false
      }

      setCurrentWeather(weatherData)
      console.log('fetch data successfully')
    })
    .catch(err => {
      console.error(err)
      setCurrentWeather(prevState => ({
        ...prevState,
        isLoading: false,
        loadFailed: true
      }))
    })
  }

  useEffect(() => {
    fetchCurrentWeather()
  }, [])

  const {
    observationTime,
    locationName,
    description,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
    loadFailed
  } = currentWeather;

  return (
    <Card>
      <Location>{locationName}</Location>
      <Description>{description}</Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <DayCloudy />
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh onClick={fetchCurrentWeather} isLoading={isLoading}>
        {loadFailed && '更新失敗('}
        最後觀測時間：
        {new Intl.DateTimeFormat('zh-TW', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(new dayjs(observationTime))}
        {loadFailed && ')'}
        {' '}
        {isLoading ? <LoadingIcon /> : loadFailed? <WarningIcon /> : <RefreshIcon />}
      </Refresh>
    </Card>
  )
}