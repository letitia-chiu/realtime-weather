import styled from '@emotion/styled'

import { ReactComponent as DarkModeOnIcon } from './images/darkmode-on.svg'
import { ReactComponent as DarkModeOffIcon } from './images/darkmode-off.svg'

const Switcher = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  
  svg {
    width: 30px;
    height: auto;
    cursor: pointer;
  }
` 

export default function ThemeSwitcher({ theme, setTheme }) {

  const handleClick = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Switcher onClick={handleClick}>
      {theme === 'dark' ? <DarkModeOffIcon /> : <DarkModeOnIcon />}
    </Switcher>
  )
}