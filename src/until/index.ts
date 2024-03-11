export const throttle = (fn:Function) => {
  let lock = false
  return function (this:any,...args:any[]) {
    if (lock) return
    lock = true
    window.requestAnimationFrame(() => {
      fn.apply(this,args)
      lock = false
    })
  }
}

export  const  getId = (length:number) => {
  const firstCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456"
  let randomString = '';
  const firstIndex = Math.floor(Math.random() * firstCharset.length);
  const first = firstCharset[firstIndex]
  randomString += first
  for (let i = 0; i < length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomString += charset[randomIndex];
  }
  return randomString;
}