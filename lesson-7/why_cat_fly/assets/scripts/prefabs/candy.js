const gameManager = require('game_manager');

const { GAME_STATE, getGameState } = gameManager;

cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机分数',
        },
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机血量',
        },
        speedMax: 0,
        speedMin: 0,
        frames: {
            default: [],
            type: cc.SpriteFrame,
        },
        boomSound: {
            default: null,
            type: cc.AudioClip,
        },
        ps: cc.Prefab,
        tile: cc.Sprite,
        scoreLabel: cc.Label,
    },

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.init();
    },

    init () {
        this.speed = 0;
        this.hide = false;
        this.tile.node.opacity = 255;
        this.scoreLabel.node.opacity = 255;
        this.unscheduleAllCallbacks();
    },

    setHp (hp = 0) {
      this.candyHp = hp;
      this.renderHpAndColor();

      // NOTE: make score equal initial hp.
      this.score = hp;
    },

    renderHpAndColor () {
      let hpLabel = cc.find('hplabel', this.node).getComponent(cc.Label);
      hpLabel.string = this.candyHp;

      if (this.candyHp <= 10) {
          this.tile.spriteFrame = this.frames[0];
      } else if (this.candyHp <= 20) {
          this.tile.spriteFrame = this.frames[1];
      } else if (this.candyHp <= 30) {
          this.tile.spriteFrame = this.frames[2];
      } else {
          this.tile.spriteFrame = this.frames[3];
      }
    },

    setSpeed (speed) {
      this.speed = speed;
    },

    //碰撞检测
    onCollisionEnter (other, self){
        if (other.node.group !== 'bullet') {
            return;
        }

        if (this.hide) return;

        if (this.candyHp === 0) {
            this.renderHpAndColor();
            this.boom();
            return;
        }

        if (this.candyHp > 0) {
            this.renderHpAndColor();
            this.candyHp--;

            if (gameManager.getGameState() === GAME_STATE.PLAYING) {
                gameManager.addScore(1);
            }
        }
    },

    boom () {
        cc.audioEngine.playEffect(this.boomSound);
        this.hide = true;

        // TODO: ps 也要加入对象池
        if (this.ps) {
            const ps = cc.instantiate(this.ps);
            this.node.addChild(ps);
        }

        this.scheduleOnce(() => {
            this.candyGroup.destroyCandy(this.node);
        }, 0.5);
    },

    update (dt) {
        if (this.candyGroup.paused) return;
        if (this.hide) {
            this.tile.node.opacity = 0;
            this.scoreLabel.node.opacity = 0;
        }

        this.node.y -= dt * this.speed;

        if (this.node.y < - this.node.parent.height / 2) {
            this.candyGroup.destroyCandy(this.node);
        }
    },
});
