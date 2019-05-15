const gameManager = require('../game_manager');
const { batchInitPoolNode, get, put } = require('../module/pool');

const { getDuration, setScore } = gameManager;

const ScoreRange = cc.Class({
    name: 'ScoreRange',
    properties: {
        min: 0,
        max: 0,
    },
});

const Candy = cc.Class({
    name: 'Candy',
    properties: {
        name: '',
        prefab: cc.Prefab,
        poolAmount: 0,
        range: {
            default: [],
            type: ScoreRange,
        },
    },
});

const refreshProbability = [
    [{ from: 0, to: 0.7 }, { from: 0.7, to: 1 }],
    [{ from: 0, to: 0.35 }, { from: 0.35, to: 0.8 }, { from: 0.8, to: 1 }],
    [{ from: 0, to: 0.2 }, { from: 0.2, to: 0.6 }, { from: 0.6, to: 0.9 }, { from: 0.9, to: 1 }],
    [{ from: 0, to: 0.15 }, { from: 0.15, to: 0.45 }, { from: 0.45, to: 0.85 }, { from: 0.85, to: 1 }],
    [{ from: 0, to: 0.05 }, { from: 0.05, to: 0.25 }, { from: 0.25, to: 0.45 }, { from: 0.45, to: 1 }],
];

const periods = [
    { from: 0, to: 20 },
    { from: 20, to: 50 },
    { from: 50, to: 75 },
    { from: 75, to: 90 },
    { from: 90, to: 100 },
];

function checkRange(range, value) {
    for (let i = 0; i < range.length; i++) {
        if (range[i].from <= value && value <= range[i].to) {
            return i;
        }
    }

    return -1;
}

function getRefreshTiles(time) {
    let period = checkRange(periods, time);

    if (period === -1) {
        period = 4;
    }

    // [3, 4, 3+4, 4+4]
    const modePeriod = refreshProbability[period];
    if (!modePeriod) return;

    // 0: 3, 1: 4, 2: 3+4, 3: 4+4
    const modeLine = checkRange(modePeriod, Math.random());
    return modeLine;
}

function shuffle(a) {
    return a.concat().sort(function (a, b) {
        return Math.random() - 0.5;
    });
}

function getRandomHpAndShuffle(range) {
    const result = [];
    for (let i = 0; i < range.length; i++) {
        result.push(Math.floor(Math.random() * (range[i].max - range[i].min)) + range[i].min);
    }

    return shuffle(result);
}

cc.Class({
    extends: cc.Component,
    properties: {
        candies: {
            default: [],
            type: Candy,
        },
        speedMax: 0,
        speedMin: 0,
        freq: 0,
        delayMin: 0,
        delayMax: 0,
    },

    // use this for initialization
    onLoad: function () {
        batchInitPoolNode(this.candies);
    },

    // 敌机出动
    startAction: function () {
        const delay = Math.random() * (this.delayMax - this.delayMin) + this.delayMin;

        this.scheduleOnce(() => {
            // refresh one wave
            this.generate();

            this.schedule(() => {
                if (this.paused) return;

                this.generate();
            }, this.freq);
        }, delay);
    },

    stopAction: function () {
        this.unscheduleAllCallbacks();
        this.node.removeAllChildren();
    },

    pauseAction () {
        this.paused = true;
    },

    resumeAction () {
        this.paused = false;
    },

    generate() {
        const lineMode = getRefreshTiles(getDuration());
        if (lineMode !== -1) {
            this.generateCandyWave(lineMode);
        } else {
            console.warn('lineMode -1');
        }
    },

    getCurrentSpeed() {
        let speed = this.speedMin;
        let dt = this.speedMax - this.speedMin;
        let extent = getDuration() / 90;
        extent = (extent <= 1 ? extent : 1);
        speed += dt * extent;

        return speed;
    },

    getCandyForFour() {
        return Math.random() > 0.5 ? this.candies[1] : this.candies[2];
    },

    generateCandyLine(candy, count, speed, level = 0) {
        const poolName = candy.name;
        const hps = getRandomHpAndShuffle(candy.range);
        console.log(hps);

        // TODO: 临时处理，算个成绩
        // gameManager.addScore(hps.reduce((p, n) => { return p + n }, 0));

        const split = 26 / (count + 1);
        for (let i = 0; i < count; i++) {
            const newNode = get(poolName, candy.prefab);
            this.node.addChild(newNode);

            const pos = cc.v2(
                (- this.node.width / 2) + split * (i + 1) + newNode.width / 2 + i * newNode.width,
                this.node.height / 2 + newNode.height + level * 110,
            );
            newNode.setPosition(pos);
            const component = newNode.getComponent('candy');
            component.candyGroup = this;
            component.init();
            component.setSpeed(speed);
            component.setHp(hps[i]);
        }
    },

    generateCandyWave(lineMode) {
        const tips = ['3', '4', '3+4', '4+4'];
        console.log(`wave: ${tips[lineMode]}`);

        const speed = this.getCurrentSpeed();
        switch (lineMode) {
            // 3 个块
            case 0:
                {
                    this.generateCandyLine(this.candies[0], 3, speed);
                    break;
                }
            // 4 个块
            case 1:
                {
                    this.generateCandyLine(this.getCandyForFour(), 4, speed);
                    break;
                }
            // 3+4 个块
            case 2:
                {
                    const candyForThree = this.candies[0];
                    const candyForFour = this.getCandyForFour();

                    const levels = shuffle([0, 1]);
                    this.generateCandyLine(candyForThree, 3, speed, levels[0]);
                    this.generateCandyLine(candyForFour, 4, speed, levels[1]);
                    break;
                }
            // 4+4 个块
            case 3:
                {
                    this.generateCandyLine(this.getCandyForFour(), 4, speed);
                    this.generateCandyLine(this.getCandyForFour(), 4, speed, 1);
                    break;
                }
            default:
                break;
        }
    },

    destroyCandy (node) {
        put(node.name, node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
