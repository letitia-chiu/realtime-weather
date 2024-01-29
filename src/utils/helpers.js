import dayjs from 'dayjs'

const getMoment = (sunRiseTime, sunSetTime) => {
  const currentTime = dayjs().format('HH:mm')
  return (currentTime >= sunRiseTime && currentTime < sunSetTime) ? 'day' : 'night'
}

const availableLocations = [
  {
    locationName: '臺北市',
    stationName: '臺北',
  },
  {
    locationName: '新北市',
    stationName: '新北',
  },
  {
    locationName: '基隆市',
    stationName: '基隆',
  },
  {
    locationName: '桃園市',
    stationName: '新屋',
  },
  {
    locationName: '新竹縣',
    stationName: '新竹',
  },
  {
    locationName: '臺中市',
    stationName: '臺中',
  },
  {
    locationName: '彰化縣',
    stationName: '田中',
  },
  {
    locationName: '南投縣',
    stationName: '日月潭',
  },
  {
    locationName: '嘉義市',
    stationName: '嘉義',
  },
  {
    locationName: '臺南市',
    stationName: '臺南',
  },
  {
    locationName: '高雄市',
    stationName: '高雄',
  },
  {
    locationName: '屏東縣',
    stationName: '恆春',
  },
  {
    locationName: '宜蘭縣',
    stationName: '宜蘭',
  },
  {
    locationName: '花蓮縣',
    stationName: '花蓮',
  },  
  {
    locationName: '臺東縣',
    stationName: '臺東',
  },
  {
    locationName: '澎湖縣',
    stationName: '澎湖',
  },
  {
    locationName: '金門縣',
    stationName: '金門',
  },  
  {
    locationName: '連江縣',
    stationName: '馬祖',
  },
]

const findLocation = (cityName) => {
  return availableLocations.find(location => location.locationName === cityName)
}

export { getMoment, findLocation, availableLocations }