/**
 * 
 * @param {Node} dom - 隐藏节点，从场景中移除
 */
const hide = (dom) => {
    if (typeof dom === 'object') {
        dom.active = false
    }
}

/**
 * 
 * @param {Node} dom - 显示节点
 */
const show =(dom) => {
    if (typeof dom === 'object') {
        dom.active = true
    }
}

/**
 * 
 * @param {string} name - 查找资源的名字，或者路径
 * @param {Node} context - 查找的上下文节点
 */
const find = (name, context) => {
    if (!name) {
        return false
    }
    if (context) {
        return cc.find(name, context)
    }
    return cc.find(name)
}

/**
 * 
 * @param {Node} node - 节点
 * @param {string} name - 名字 
 */
const getCmp = (node, name) => {
    let observeNames = {
        'label': 'cc.Label',
        'animate': 'cc.Animation',
        'sprite': 'cc.Sprite'
    }
    if (!node || !name) {
        return false
    }
    if (observeNames[name]) {
        return node.getComponent(observeNames[name])
    }
    return node.getComponent && node.getComponent(name)
}

/**
 * 
 * @param {Node} node - 节点
 */
const getChildren = (node) => {
    return node && node.children
}

/**
 * 
 * @param {Node} node - 节点
 * @param {string} name - 名字
 */
const getChildByName = (node, name) => {
    return node && node.getChildByName(name)
}

/**
 * 
 * @param {Node} parent - 父类节点
 * @param {Node} node - 节点
 */
const append = (parent, node) => {
    if (!parent || !node) {
        return false
    }
    return parent && parent.addChild && parent.addChild()
}

/**
 * 
 * @param {Node} node - 节点,通过节点查找他的父类
 */
const getParent = (node) => {
    return node && node.parent
}
/**
 * 
 * @param {Node} node - 节点
 * @param {object} styles - 样式对象,通过遍历设置里面的值
 */
const setStyles = (node, styles = {})  => {
    let observeKeys = {
        'anchor': '',
        'anchorX': '',
        'anchorY': '',
        'width':  '',
        'height': '',
        'opacity': '',
        'scale': '',
        'scaleX': '',
        'scaleY': '',
        'x': '',
        'y': '',
        'rotation': '',
        'rotate': ''
    }
    if (!node) {
        return false
    }
    for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
            if (observeKeys[key] !== undefined) {
                if (key === 'rotata') {
                    key = 'rotation'
                }
                node[key] = styles[key]
            }
        }
    }
}

/**
 * 
 * @param {Node} node - 节点
 * @param {string} props - 属性,有属性时候返回属性的节点，没有时候全部放回
 */
const getStyle = (node, props) => {
    let observeKeys = {
        'anchor': '',
        'anchorX': '',
        'anchorY': '',
        'width':  '',
        'height': '',
        'opacity': '',
        'scale': '',
        'scaleX': '',
        'scaleY': '',
        'x': '',
        'y': '',
        'rotation': ''
    }
    let result = {}
    if (!node) {
        return false
    }
    
    for (let key in observeKeys) {
        if (observeKeys.hasOwnProperty(key)) {
            result[key] = node[key]
            if (props === key) {
                return result[key]
            }
        }
    }
    return result
    
}
/**
 * 
 * @param {Node} node - 设置节点
 */
const cloneNode = (node) => {
    if (!node) {
        return false
    }
    return cc.instantiate(node)
}

/**
 * 获取场景
 */
const getScene = () => {
    return cc.director.getScene()
}

/**
 * 
 * @param {Node} node - 销毁节点
 */
const destoryNode = (node) => {
    return node && node.destory && node.destory()
}
/**
 * 
 * @param {string} name - 节点名字
 * @param {function} cb - 加载成功以后的回调
 */
const loadScene = (name, cb) => {
    if (!name) {
        return false
    }
    return cc.director.loadScene(name, () => {
        if (typeof cb === 'function') {
            cb()
        }
    })
}

/**
 * 
 * @param {string} path - 资源的路径，在项目的根目录下面的resources
 * @param {function} cb - 加载成功的回调函数
 * @param {string} type - 根据类型加载不同的资源，有 atlas,sprite和默认的类型
 */
const loadRes = (path, cb, type) => {
    if (!path) {
        return false
    }
    if (type === 'atlas') {
        return cc.loader.loadRes(path, cc.SpriteAtlas, function (error, atlas) {
            if (typeof cb === 'function') {
                cb(error, atlas)
            }
        })
    }
    if (type === 'sprite') {
        return cc.loader.loadRes(path, cc.SpriteFrame, function (error, spriteFrame) {
            if (typeof cb === 'function') {
                cb(error, spriteFrame)
            }
        })
    }
    return cc.loader.loadRes(path, function (error, resource) {
        if (typeof cb === 'function') {
            cb(error, resource)
        }
    })
}

/**
 * 
 * @param {string} prefabPath - 预制资源的路径
 * @param {function} cb - 加载成功以后的回调
 */
const loadPrefab = (prefabPath, cb) => {
    return loadPrefab(prefabPath, cb)
}

/**
 * 
 * @param {string} path - 资源的路径
 * @param {function} cb - 加载成功执行的回调，第一个参数为error, 第二个为资源
 */
const loadAnimationClip = (path, cb) => {
    return loadRes(path, cb)
}

/**
 * 
 * @param {string} path - 资源的路径 
 * @param {function} cb - 加载成功执行的回调 
 */
const loadAtlas = (path, cb) => {
    return loadRes(path, cb, 'atlas')
}

/**
 * 
 * @param {string} path - 资源的路径 
 * @param {function} cb - 加载成功的回调
 */
const loadSprite = (path, cb) => {
    return loadRes(path, cb, 'sprite')
}

/**
 * 
 * @param {string} path - 需要释放资源的路径
 * @param {string} type - 根据类型来判断释放, type有 sprite, atlas,和默认三种
 */
const releaseRes = (path, type) => {
    if (type === 'sprite') {
        return cc.loader.releaseRes(path, cc.SpriteFrame)
    }
    if (type === 'atlas') {
        return cc.loader.releaseRes(path, cc.SpriteAtlas)
    }
    return cc.loader.releaseRes(path)
}

/**
 * 
 * @param {string} path - 资源的路径
 * @param {function} cb - 成功以后的回调
 */
const loadTexture = (path, cb) => {
    return cc.loader.loadRes(path, function (error, texture) {
        if (typeof cb === 'function') {
            cb(error, texture)
        }
    })
}

/**
 * 
 * @param {string} path - 资源的路径，主要使用转为texture资源
 */
const rawUrl = (path) => {
    return cc.url.raw(path)
}

/**
 * 
 * @param {string} path - 远程资源的地址
 * @param {function} cb - 加载成功以后的回调
 */
const loadRemoteRes = (path, cb) => {
    let remoteUrl = ''
    if (!path) {
        return false
    }
    if (path.match && path.match(/\.(jpg|jpeg|png|gif)$/)) {
        remoteUrl = path
    } else {
        remoteUrl = {
            url: path,
            type: 'png'
        }
    }
    return cc.loader.load(remoteUrl, function (error, texture) {
        if (typeof cb === 'function') {
            cb(error, texture)
        }
    });
}

/**
 * 
 * @param {texture} res - 需要释放的资源,类型texture这样的资源引用 
 */
const release = (res) => {
    if (!res) {
        return false
    }
    cc.loader.release(res)
}
/**
 * 
 * @param {string} path - 根据资源的路径来释放它的依赖资源，使用与释放prefab对
 */
const releaseDepRes = (path) => {
    if (!path) {
        return false
    }
    return cc.loader.getDependsRecursively(path)
}

/**
 * 
 * @param {array} exts - 扩展的数组对象，一个对象时候扩展在$ 对象，大于一个，第一个为目标对象
 */
const extend = (...exts) => {
    let length = exts.length
    let target = null
    if (length === 0) {
        return false
    }
    if (length === 1) {
        target = $
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
const $ = {}
$.extend = extend
$.extend({
    hide,
    show,
    find,
    release,
    release,
    getCmp,
    getChildByName,
    getChildren,
    loadRemoteRes,
    loadAnimationClip,
    loadAtlas,
    loadPrefab,
    loadSprite,
    loadScene,
    append,
    getParent,
    setStyles,
    getStyle,
    releaseDepRes,
    releaseRes,
    loadTexture,
    getScene,
    rawUrl,
    cloneNode,
    destoryNode
})

module.exports = $