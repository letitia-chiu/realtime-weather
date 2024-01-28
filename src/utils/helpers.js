import dayjs from 'dayjs'

const getMoment = (sunRiseTime, sunSetTime) => {
  console.log('getMoment executed', sunRiseTime, sunSetTime)
  const currentTime = dayjs().format('HH:mm')
  return (currentTime >= sunRiseTime && currentTime < sunSetTime) ? 'day' : 'night'
}

export { getMoment }