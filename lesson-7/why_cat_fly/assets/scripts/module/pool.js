let poolData = {}

//销毁对象池存贮对象
const destroy = () => {
    poolData = null
}

/**
 * 
 * @param {string} name - 常量池的名字
 * @param {Node} node - 节点
 */
const put  = (name, node) => {
    if (!name || typeof name !== 'string' || typeof node !== 'object') {
        return false
    }
    poolData[name] = poolData[name] || new cc.NodePool()
    poolData[name].put(node)
}
/**
 * 
 * @param {string} name 名字
 * @param {string} prefab 预制资源
 */
const get = (name, prefab) => {
    if (poolData[name]) {
        if (poolData[name].size() > 0) {
            return poolData[name].get()
        }
        if (prefab) {
            return cc.instantiate(prefab)
        }
    }

}

/**
 * 
 * @param {array} arrOpts - 数组
 */
const batchInitPoolNode = (arrOpts = []) => {
    for (let i = 0, length = arrOpts.length; i < length; i ++) {
        initPoolNode(arrOpts[i])
    }
}

/**
 * 
 * @param {object} opts - 初始化常量池要的对象参数，prefab是必须的
 */
const initPoolNode = (opts = {}) => {
    let defaultOpt = {
        name: 'cocosPool',
        prefab: null,
        size: 6
    }
    opts = Object.assign({}, defaultOpt, opts)
    if (!opts.prefab) {
        return false
    }
    for (let i = 0; i < opts.size; i++) {
        let node = cc.instantiate(opts.prefab)
        put(opts.name, node)
    }

}
/**
 * 
 * @param {string} name - 根据名字销毁常量池，不销毁对象引用,不传清空所有
 */
const clearPool = (name) => {
    if (!name) {
        return Object.keys(poolData).map((key) => {
            if (poolData[key] && poolData[key].clear) {
                poolData[key].clear()
            }
        })
    }
    if (typeof name === 'string') {
        return poolData[name] && poolData[name].clear && poolData[name].clear()
    }
}

/**
 * 
 * @param {string} name - 根据名字销毁已经存贮的常量池,不传则重置常量池
 */
const clear = (name) => {
    if (!name) {
        return poolData = {}
    }
    if (poolData[name]) {
        poolData[name] = null
    }
}


module.exports = {
    clear,
    destroy,
    clearPool,
    initPoolNode,
    batchInitPoolNode,
    put,
    get
}