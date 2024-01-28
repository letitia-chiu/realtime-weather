/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react'

import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'

import WeatherCard from './components/WeatherCard'
import ThemeSwitcher from './components/ThemeSwitcher'

import dayjs from "dayjs"

import { fetchSunTime } from './utils/api-helpers'

const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'))
  const [moment, setMoment] = useState('day')
  const [sunTime, setSunTime] = useState('')

  const getMoment = (sunTimeData) => {
    if (!sunTimeData) {
      return
    }

    const currentTime = dayjs().format('HH:mm')
    const { sunRiseTime, sunSetTime } = sunTimeData

    console.info('Moment set, current time', currentTime)
    if (currentTime > sunRiseTime && currentTime < sunSetTime) {
      setMoment('day')
      setCurrentTheme('light')
    } else {
      setMoment('night')
      setCurrentTheme('dark')
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const today = dayjs().format('YYYY-MM-DD')
        await setDate(today)
        console.info('Date set:', today)

        const sunTimeData = await fetchSunTime(date)
        await setSunTime(sunTimeData)
        console.info('Sun time set')

        getMoment(sunTimeData)        
      } catch (err) {
        console.err(err)
      }
    })(); 
  }, [date])
  
  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard moment={moment} getMoment={getMoment} sunTime={sunTime} />
        <ThemeSwitcher
          theme={currentTheme}
          setTheme={setCurrentTheme}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App;
