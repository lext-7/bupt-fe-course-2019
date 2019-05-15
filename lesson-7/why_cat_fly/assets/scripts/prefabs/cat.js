const gameManager = require('../game_manager');

const { GAME_MODE } = gameManager;

cc.Class({
    extends: cc.Component,

    properties: {
        dieSound: {
            default: null,
            type: cc.AudioClip,
        },
        body: cc.Node,
        shield: cc.Node,
        boom: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {
    //
    // },

    onCollisionEnter (other, self) {
        if (other.node.group === 'weapon') {
            switch (other.node.name) {
                case 'weapon_bullet': {
                    if (this.bulletGroup) {
                        this.bulletGroup.changeBullet(other.node.name);
                    }
                    break;
                }
                case 'weapon_tnt': {
                    gameManager.addWeaponTNTCount(1);
                    break;
                }
            }
        } else if (other.node.group === 'candy') {
            if (this.invincible) return;
            if (this.godying) return;

            const hp = other.node.getComponent('candy').candyHp;
            if (hp > 0) {
                this.willDie();
            }
        }
    },

    willDie () {
        this.godying = true;

        cc.audioEngine.playEffect(this.dieSound);
        const boomAnimation = this.boom.getComponent(cc.Animation);
        boomAnimation.play('boom');
        boomAnimation.on('finished', () => {
            const bodyAnimation = this.body.getComponent(cc.Animation);
            bodyAnimation.play('cat-die');
            bodyAnimation.on('finished', this.onCatDieAnimationFinished, this);
        });
    },

    onCatDieAnimationFinished () {
        if (this.gameScript) {
            const gameMode = gameManager.getGameMode();

            // if (gameMode === GAME_MODE.NORMAL) {
            //     const retryTimes = gameManager.getRetryTimes();
            //
            //     if (!retryTimes) {
            //         this.gameScript.showWatchVideoView();
            //         return;
            //     }
            // }

            this.gameScript.showGameOverUI();
            this.gameScript.gameOver();
        }
    },

    start () {
        this.addShield();
    },

    addShield () {
        this.invincible = true;
        this.shield.active = true;

        this.scheduleOnce(() => {
            this.invincible = false;
            this.shield.active = false;
        }, 3);
    },

    // update (dt) {},
});
