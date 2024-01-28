/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react'

import { ReactComponent as AirFlowIcon } from '../images/airFlow.svg'
import { ReactComponent as RainIcon } from '../images/rain.svg'
import { ReactComponent as RefreshIcon } from '../images/refresh.svg'
import { ReactComponent as LoadingIcon } from '../images/loading.svg'
import { ReactComponent as WarningIcon } from '../images/warning.svg'

import styled from '@emotion/styled'
import dayjs from 'dayjs'

import WeatherIcon from './WeatherIcon'

import { fetchCurrentWeather, fetchWeatherForecast, fetchSunTime } from '../utils/api-helpers'

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

export default function WeatherCard({ date }) {

  const [weatherElement, setWeatherElement] = useState({
    observationTime: new Date(),
    locationName: '',
    temperature: 0,
    windSpeed: 0,
    description: '',
    weatherCode: 0,
    rainPossibility: 0,
    comfortability: '',
    isLoading: true,
    loadFailed: false
  })

  const fetchData = async () => {
    try {
      setWeatherElement(prevState => ({
        ...prevState,
        isLoading: true
      }))

      const [currentWeather, weatherForecast] = await Promise.all([
        fetchCurrentWeather(),
        fetchWeatherForecast()
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
  }

  useEffect(() => {
    fetchData()
  }, [])

  const {
    observationTime,
    locationName,
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
    loadFailed
  } = weatherElement

  const [moment, setMoment] = useState('day')
  useEffect(() => {
    ;(async () => {
      try {
        const { sunRiseTime, sunSetTime } = await fetchSunTime(date)
        const currentTime = dayjs().format('HH:mm')

        console.log('SunRiseTime: ', sunRiseTime, 'SunSetTime: ', sunSetTime, 'CurrentTime: ', currentTime)

        if (currentTime > sunRiseTime && currentTime < sunSetTime) {
          setMoment('day')
        } else {
          setMoment('night')
        }
      } catch (err) {
        console.err(err)
      }
    })(); 

  }, [date])


  return (
    <Card>
      <Location>{locationName}</Location>
      <Description>
        {description}　{comfortability}
      </Description>
      <CurrentWeather>
        <Temperature>
          {Math.round(temperature)} <Celsius>°C</Celsius>
        </Temperature>
        <WeatherIcon weatherCode={weatherCode} moment={moment}/>
      </CurrentWeather>
      <AirFlow>
        <AirFlowIcon /> {windSpeed} m/h
      </AirFlow>
      <Rain>
        <RainIcon /> {rainPossibility}%
      </Rain>
      <Refresh onClick={fetchData} isLoading={isLoading}>
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