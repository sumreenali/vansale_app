import Months from './Months';

export default function time(time) {
  const timeStamp = new Date(`${time}`);
  const date = timeStamp.getDate();
  const month = timeStamp.getMonth();
  const year = timeStamp.getFullYear();

  var hours = timeStamp.getHours()
  var minutes = timeStamp.getMinutes()
  var ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes
  var strTime = hours + ":" + minutes + " " + ampm

  return `${date +" "+ Months(month) +" "+ year + "\n"+ strTime }`
}
