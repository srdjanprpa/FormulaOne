let DateBetween = function(startDate, endDate) {
  let minute = 60
  let hour = minute * 60
  let day = hour * 24
  let distance = endDate - startDate

  if (distance < 0) {
    return false
  }

  let days = Math.floor(distance / day)
  let hours = Math.floor((distance % day) / hour)
  let minutes = Math.floor((distance % hour) / minute)

  let between = []

  days >= 10 ? between.push(`${days}`) : days > 0 ? between.push(`0${days}`) : between.push('00')
  hours >= 10 ? between.push(`${hours}`) : hours > 0 ? between.push(`0${hours}`) : between.push('00')
  minutes >= 10 ? between.push(`${minutes}`) : minutes > 0 ? between.push(`0${minutes}`) : between.push('00')

  return between
}

module.exports = DateBetween
