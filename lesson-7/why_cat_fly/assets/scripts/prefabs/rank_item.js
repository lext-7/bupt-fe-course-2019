const gameManager = require('../game_manager');

const { GAME_MODE } = gameManager;

cc.Class({
    extends: cc.Component,

    properties: {
        index: cc.Label,
        avatar: cc.Sprite,
        nickname: cc.Label,
        score: cc.Label,
        board: cc.Sprite,
        boards: {
            default: [],
            type: cc.SpriteFrame,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        const gameMode = gameManager.getGameMode();
        const isSelf = this.isSelf;

        if (gameMode === GAME_MODE.BATTLE) {
            if (isSelf) {
                this.board.spriteFrame = this.boards[3];
            } else {
                this.board.spriteFrame = this.boards[2];
            }
        } else if (gameMode === GAME_MODE.NORMAL) {
            if (isSelf) {
                this.board.spriteFrame = this.boards[1];
            } else {
                this.board.spriteFrame = this.boards[0];
            }
        }
    },

    render ({ index, avatar, nickname, score }) {
        this.index.string = index;
        if (avatar) {
            cc.loader.load({
                url: avatar,
                type: 'image',
            }, (err, texture) => {
                if (err) {
                    console.log('渲染头像错误: ', err);
                    console.log(`头像地址: ${avatar}`);
                } else {
                    this.avatar.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        }
        this.nickname.string = nickname;
        this.score.string = score;
    },

    // update (dt) {},
});
