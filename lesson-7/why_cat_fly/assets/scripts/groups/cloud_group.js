const { batchInitPoolNode, get, put } = require('../module/pool');

const Cloud = cc.Class({
    name: 'Cloud',
    properties: {
        prefab: cc.Prefab,
        docked: {
            default: 0,
            type: cc.Enum({
                left: 0,
                right: 1,
            }),
        },
        name: '',
        poolAmount: 0,
    },
});

cc.Class({
    extends: cc.Component,

    properties: {
        clouds: {
            name: '各种各样的云',
            default: [],
            type: Cloud,
        },
        freq: 0,
        delayMin: 0,
        delayMax: 0,
        speedMin: 0,
        speedMax: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        batchInitPoolNode(this.clouds);
    },

    startAction() {
        const delay = Math.random() * (this.delayMax - this.delayMin + 1) + this.delayMin;
        this.scheduleOnce(() => {
            this.generateCloud();
            this.schedule(() => {
                if (this.paused) return;

                this.generateCloud();
            }, this.freq)
        }, delay);
    },

    stopAction() {
        this.unscheduleAllCallbacks();
        this.node.removeAllChildren();
    },

    pauseAction () {
        this.paused = true;
    },

    resumeAction () {
        this.paused = false;
    },

    getRandomCloud() {
        return this.clouds[Math.floor(Math.random()*this.clouds.length)];
    },

    getRandomSpeed() {
        return Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
    },

    generateCloud() {
        const cloud = this.getRandomCloud();
        if (!cloud) return;

        const poolName = cloud.name;
        const newNode = get(poolName, cloud.prefab);
        this.node.addChild(newNode);

        // left
        if (cloud.docked == 0) {
            newNode.anchorX = 0;
            newNode.setPosition(
                - this.node.width / 2,
                this.node.height / 2 + newNode.height,
            );
        } else if (cloud.docked == 1) {
            newNode.anchorX = 1;
            newNode.setPosition(
                this.node.width / 2,
                this.node.height / 2 + newNode.height,
            );
        }

        const componet = newNode.getComponent('cloud');
        componet.cloudGroup = this;
        componet.speed = this.getRandomSpeed();
    },

    destroyCloud (node) {
        put(node.name, node);
    },

    // update (dt) {},
});
