/**
 *  防抖操作  为了防止过度刷新界面给用户带来不好体验。
 */
export function debounce(func, delay = 50) {
  let timer = null
  return function (...args) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    },delay)
  }
}