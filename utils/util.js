const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const nowDayOfWeek = date.getDay()
  var arr1 = ["一", "二", "三", "四", "五","六","天"]
  var result = arr1.find(function (currentValue, index, arr) { return index == nowDayOfWeek-1});
  return [year, month, day].map(formatNumber).join('/') + ' ' + '星期' + result
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
