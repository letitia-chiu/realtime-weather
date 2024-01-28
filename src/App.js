/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'

import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'

import WeatherCard from './components/WeatherCard'
import ThemeSwitcher from './components/ThemeSwitcher'

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

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard />
        <ThemeSwitcher
          theme={currentTheme}
          setTheme={setCurrentTheme}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App;
