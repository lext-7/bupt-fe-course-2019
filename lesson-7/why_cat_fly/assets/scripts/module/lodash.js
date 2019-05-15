const _ = {}
const _toString = Object.prototype.toString
/**
 * 
 * @param {*} obj - 判断是否为对象 
 */
const isObject = (obj) => {
    return _toString.call(obj) === '[object Object]'
}


/**
 * 
 * @param {*} fn - 判断是否为方法
 */
const isFunction = (fn) => {
    return typeof fn === 'function'
}
const assign = (...objs) => {
    let target = objs[0] || {}
    let copyObjs = objs.slice(1)
    for (let i in copyObjs) {
        if (isObject(copyObjs[i])) {
            for (let key in copyObjs[i]) {
                if (copyObjs[i].hasOwnProperty(key)) {
                    target[key] = copyObjs[i][key]
                }
            }
        }
    }
    return target
}
/**
 * 
 * @param {array} exts - 开放扩展接口，使用覆盖模式
 */
const extend = (...exts) => {
    let length = exts.length
    let target = null
    if (length === 0) {
        return false
    }
    if (length === 1) {
        target = _
    } else {
        target = exts[0] || {}
        exts = exts.slice(1)
    }
    for (let i in exts) {
        if (typeof exts[i] === 'object' && exts[i] !== null) {
            for (let key in exts[i]) {
                if (exts[i].hasOwnProperty(key)) {
                    target[key] = exts[i][key]
                }
            }
        }
        
    }
    return target
}
_.extend = extend
_.extend({
    isObject,
    assign,
    isFunction
})
module.exports = _

