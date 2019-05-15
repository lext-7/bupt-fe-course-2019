const { initPoolNode, batchInitPoolNode, get, put } = require('../module/pool');

// 子弹生成的位置
const bulletPosition = cc.Class({
    name: 'bulletPosition',
    properties: {
        positionX: {
            default: '',
            tooltip: '子弹相对Hero的位置'
        },
        angle: {
            default: 90,
            tooltip: '子弹角度'
        }
    }
});

// 无限时长子弹
const infiniteBullet = cc.Class({
    name: 'infiniteBullet',
    properties: {
        name: '',
        rate: 0,
        poolAmount: 0,
        prefab: cc.Prefab,
        position: {
            default: [],
            type: bulletPosition,
            tooltip: '子弹位置'
        }
    }
});

// 有限时长子弹
const finiteBullet = cc.Class({
    extends: infiniteBullet,
    name: 'finiteBullet',
    properties: {
        duration: 0,
        ufoBulletName: ''
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        infiniteBullet: {
            default: null,
            type: infiniteBullet,
            tooltip: '无限子弹'
        },
        finiteBullet: {
            default: [],
            type: finiteBullet,
            tooltip: '有限子弹'
        }, 
        bulletSound: {
            default: null,
            type: cc.AudioClip,
        },
    },

    onLoad () {
        initPoolNode(this.infiniteBullet);
        batchInitPoolNode(this.finiteBullet);
    },

    startAction () {
        this.paused = false;

        this.timerForShoot = () => {
            if (this.paused) return;

            this.genNewBullet(this.infiniteBullet);
            cc.audioEngine.playEffect(this.bulletSound);
        };

        this.schedule(this.timerForShoot, this.infiniteBullet.rate);
    },

    stopAction () {
        this.unscheduleAllCallbacks();
        this.node.removeAllChildren();
    },

    pauseAction () {
        this.paused = true;
    },

    resumeAction () {
        this.paused = false;
    },

    genNewBullet (bullet) {
        let poolName = bullet.name;

        for (let i = 0; i < bullet.position.length; i++) {
            const newNode = get(poolName, bullet.prefab);

            const pos = this.getBulletPosition(bullet.position[i].positionX);
            newNode.setPosition(pos);
            newNode.rotation = (90 - bullet.position[i].angle);
            const component = newNode.getComponent('bullet');
            component.angle = bullet.position[i].angle;
            component.bulletGroup = this;

            this.node.addChild(newNode);
        }
    },

    getBulletPosition (side) {
        if (this.cat) {
            let catPostion = this.cat.getPosition();

            let x = catPostion.x;
            if (side === 'left') {
                x -= this.cat.width / 3;
            } else if (side === 'right') {
                x += this.cat.width / 3;
            }

            // TODO: 这里的写法需要优化
            return cc.v2(x, this.cat.parent.parent.getPosition().y + 60)
        } else {
            return cc.v2(0, 0);
        }
    },

    changeBullet (name) {
        this.unschedule(this.timerForShoot);

        for (let i = 0; i < this.finiteBullet.length; i++) {
            const target = this.finiteBullet[i];

            if (target.ufoBulletName === name) {
                const timerForThreeShoot = () => {
                    this.genNewBullet(target);
                    cc.audioEngine.playEffect(this.bulletSound);
                };

                this.schedule(timerForThreeShoot, target.rate, target.duration);

                // 重置为正常子弹
                const delay = target.rate * target.duration;
                this.schedule(this.timerForShoot, this.infiniteBullet.rate, cc.macro.REPEAT_FOREVER, delay);
            }
        }

    },

    destroyBullet (node) {
        put(node.name, node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
