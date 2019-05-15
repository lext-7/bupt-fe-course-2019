const gameManager = require('../game_manager');
const userManager = require('../user_manager');

const { GAME_MODE } = gameManager;

cc.Class({
    extends: cc.Component,

    properties: {
        overBoard: cc.Node,
        overBoardScore: cc.Label,

        battleBoard: cc.Node,
        battleTitleSuccess: cc.Node,
        battleTitleFail: cc.Node,
        targetAvatar: cc.Sprite,
        targetName: cc.Label,
        selfAvatar: cc.Sprite,
        selfName: cc.Label,
        battleScore: cc.Label,

        videoAdBoard: cc.Node,
        videoAdBoardScore: cc.Label,
        bestScore: cc.Label,

        btnGroup: cc.Node,
        btnTips: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.btnGroupPositionY = this.btnGroup.y;
        this.state = 'over';
    },

    start () {
    },

    onEnable () {
        const gameMode = gameManager.getGameMode();
        if (gameMode === GAME_MODE.BATTLE) {
            this.battleBoard.active = true;
            this.renderBattleInfo();

            this.overBoard.active = false;
        } else if (gameMode === GAME_MODE.NORMAL) {
            this.overBoard.active = true;
            this.overBoardScore.string = gameManager.getScore();

            this.battleBoard.active = false;
        }

        this.btnGroup.y = this.btnGroupPositionY;
        this.videoAdBoard.active = false;

        const has = gameManager.hasSharedVideo();
        if (!has) {
            this.scheduleOnce(() => {
                this.btnTips.active = true;
            }, 1);
        } else {
            this.btnTips.active = false;
        }
    },

    renderWatchVideoView() {
        this.videoAdBoard.active = true;
        this.overBoard.active = false;
        this.battleBoard.active = false;

        const currentScore = gameManager.getScore();
        const bestScore = gameManager.getBestScore();

        this.videoAdBoardScore.string = currentScore;
        if (bestScore <= currentScore) {
            this.bestScore.string = currentScore;
        } else {
            this.bestScore.string = bestScore;
        }

        this.btnGroup.y = this.btnGroupPositionY - 100;
    },

    formatNickname(name) {
        if (!name) return name;

        let formatted = name;
        let length = formatted.replace(/[\u0391-\uFFE5]/g, 'aa').length;

        // need ellipsis
        if (length > 12) {
            let allowLength = 0;

            let i = 0;
            for (; i < length; i++) {
                if (allowLength >= 10) {
                    break;
                }
                if (/^[\u3220-\uFA29]+$/.test(formatted[i])) {
                    allowLength += 2;
                } else {
                    allowLength += 1;
                }
            }

            formatted = `${formatted.substring(0, i)}...`;
        }

        return formatted;
    },

    renderBattleInfo () {
        // target
        let targetNickName = '神秘用户';
        let selfNickName = '神秘用户';
        let targetAvatarUrl = 'http://s2.pstatp.com/site_new/open/avatars/head.bd322e4ea06067ddd5f2f76f804b2760.png';
        let selfAvatarUrl = 'http://s2.pstatp.com/site_new/open/avatars/head.bd322e4ea06067ddd5f2f76f804b2760.png';
        const targetScore = gameManager.getTargetScore() || 0;
        const selfScore = gameManager.getScore() || 0;

        if (selfScore > targetScore) {
            this.battleTitleSuccess.active = true;
            this.battleTitleFail.active = false;
        } else {
            this.battleTitleSuccess.active = false;
            this.battleTitleFail.active = true;
        }

        this.battleScore.string = `${selfScore}:${targetScore}`;

        try {
            const { query } = gameManager.getLaunchOptions();
            const { nickname, avatar } = query;
            if (nickname) targetNickName = nickname;
            if (avatar) targetAvatarUrl = avatar;
        } catch (err) {
            console.log(err);
        }

        this.renderAvatar(this.targetAvatar, targetAvatarUrl);
        this.targetName.string = this.formatNickname(targetNickName);

        // self
        if (userManager.isUserLogin()) {
            userManager.getLocalUserInfo({
                complete: res => {
                    const { userInfo } = res;
                    if (userInfo) {
                        selfNickName = userInfo.nickName;
                        selfAvatarUrl = userInfo.avatarUrl;
                    }

                    this.renderAvatar(this.selfAvatar, selfAvatarUrl);
                    this.selfName.string = this.formatNickname(selfNickName);
                },
            });
        } else {
            this.renderAvatar(this.selfAvatar, selfAvatarUrl);
            this.selfName.string = this.formatNickname(selfNickName);
        }
    },

    renderAvatar (target, url) {
        cc.loader.load({
            url,
            type: 'image',
        }, (err, texture) => {
            if (err) {
                console.log('渲染头像错误: ', err);
                console.log(`头像地址: ${url}`);
            } else {
                target.spriteFrame = new cc.SpriteFrame(texture);
            }
        });
    },

    // update (dt) {},
});
