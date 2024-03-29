import { useState } from "react"
import styled from "@emotion/styled"

import { availableLocations } from "../utils/helpers"

const WeatherSettingWrapper = styled.div`
  position: relative;
  width: 360px;
  padding: 30px 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
`
const Title = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`
const StyledLabel = styled.label`
  display: block;
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 10px;
`
const StyledSelect = styled.select`
  display: block;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.foregroundColor};
  color: ${({ theme }) => theme.textColor};
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    padding: 10px 20px;
    border-radius: 7px;
    border: ${({ theme }) => theme.buttonBorder};
    background-color: ${({ theme }) => theme.foregroundColor};
    color: ${({ theme }) => theme.textColor};
    cursor: pointer;

    &:hover {
      border-color: #7AB8BF;
      background-color: #7AB8BF;
      color: #FFFFFF;
    }

  }
`

export default function WeatherSetting({
  currentCity,
  handleCurrentPageChange,
  handleLocationChange
}) {

  const [selected, setSelected] = useState(currentCity)

  const handleChange = (e) => {
    setSelected(e.target.value)
  }

  const handleSave = () => {
    handleLocationChange(selected)
    localStorage.setItem('cityName', selected)
    handleCurrentPageChange('WeatherCard')
  }

  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>
      <StyledSelect id="location" name="location" onChange={handleChange} defaultValue={currentCity}>
        {availableLocations.map(({ locationName }) => (
          <option value={locationName} key={locationName}>{locationName}</option>
        ))}
      </StyledSelect>
      <ButtonGroup>
        <button onClick={() => handleCurrentPageChange('WeatherCard')}>返回</button>
        <button onClick={handleSave}>儲存</button>
      </ButtonGroup>
    </WeatherSettingWrapper>
  )
}