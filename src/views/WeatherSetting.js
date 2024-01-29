import styled from "@emotion/styled"

import { availableLocations } from "../utils/helpers"

const WeatherSettingWrapper = styled.div`
  position: relative;
  min-width: 360px;
  padding: 30px 15px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  border-radius: 7px;
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
    width: 20%;
    padding: 10px;
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

export default function WeatherSetting({ handleCurrentPageChange }) {
  return (
    <WeatherSettingWrapper>
      <Title>設定</Title>
      <StyledLabel htmlFor="location">地區</StyledLabel>
      <StyledSelect id="location" name="location">
        {availableLocations.map(({ locationName }) => (
          <option value={locationName} key={locationName}>{locationName}</option>
        ))}
      </StyledSelect>
      <ButtonGroup>
        <button onClick={() => handleCurrentPageChange('WeatherCard')}>返回</button>
        <button>儲存</button>
      </ButtonGroup>
    </WeatherSettingWrapper>
  )
}