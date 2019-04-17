/**
 * 节流函数
 * @param func
 * @param interval
 * @returns {Function}
 */
export const throttle = (func, interval = 250) => {
    let timeout
    let startTime = new Date()
    return function (event) {
        let e = {...event} //保留事件对象
        clearTimeout(timeout)
        let curTime = new Date()
        if (curTime - startTime <= interval) {
            //小于规定时间间隔时，用setTimeout在指定时间后再执行
            timeout = setTimeout(() => {
                func.call(this, e)
            }, interval)
        } else {
            //重新计时并执行函数
            startTime = curTime
            func.call(this, e)
        }
    }
}