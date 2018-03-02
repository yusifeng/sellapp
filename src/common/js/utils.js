export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear()+'').substr(4-RegExp.$1.length))
  }

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))      
    }
  }
  
  return fmt
}

function padLeftZero(str) {
  return `00${str}`.substr(str.length)
}

/**
 * 
 * @example ?id=12345&name=david
 * @return Object {id: 123456, name: davids}
 */
export function urlParse() {
  let url = window.location.search
  let obj = Object.create(null)
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  //['?id=12345', '&name=david']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}