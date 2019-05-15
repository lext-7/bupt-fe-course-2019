const { batchInitPoolNode, get, put } = require('../module/pool');

const weaponG = cc.Class({
    name: 'weaponG',
    properties: {
        name: '',
        prefab: cc.Prefab,
        freq: 0,
        poolAmount: 0,
        delayMax: {
            default: 0,
            tooltip: '最大延时'
        },
        delayMin: {
            default: 0,
            tooltip: '最小延时'
        },
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        weaponG: {
            default: [],
            type: weaponG
        }
    },

    onLoad () {
        batchInitPoolNode(this.weaponG);
    },

    startAction () {
        for (let i = 0; i < this.weaponG.length; i++) {
            const weapon = this.weaponG[i];

            const delay = Math.random() * (weapon.delayMax - weapon.delayMin) + weapon.delayMin;
            this.scheduleOnce(() => {
                this.genNewWeapon(weapon);
                this.schedule(() => {
                    if (this.paused) return;

                    this.genNewWeapon(weapon);
                }, weapon.freq)
            }, delay);
        }
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

    genNewWeapon (weapon) {
        let poolName = weapon.name;
        let newNode = get(poolName, weapon.prefab);
        this.node.addChild(newNode);

        const pos = this.getNewWeaponPosition(newNode);
        newNode.setPosition(pos);
        newNode.getComponent('weapon').weaponGroup = this;
    },

    getNewWeaponPosition (node) {
        let randx = (Math.random() - 0.5) * 2 * (this.node.width / 2 - node.width / 2);
        let randy = this.node.height / 2 + node.height / 2;
        return cc.v2(randx, randy);
    },

    destroyWeapon (node) {
        put(node.name, node);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
