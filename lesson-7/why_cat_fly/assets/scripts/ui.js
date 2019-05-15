const gameManager = require('game_manager');
const rankManager = require('rank_manager');
const userManager = require('user_manager');

const { GAME_STATE } = gameManager;

let currentVideoPath = '';
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        over: cc.Node,
        rank: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.over.active = false;
        this.rank.active = false;

        gameManager.onVideoRecorded((path) => {
            currentVideoPath = path;
        });
    },

    start () {

    },

    cleanVideoPath () {
        currentVideoPath = '';
    },

    showOver () {
        this.over.active = true;
    },

    hideOver () {
        this.over.active = false;
    },

    showOverVideoAd () {
        this.over.active = true;
        this.over.getComponent('over').renderWatchVideoView();
    },

    showRank () {
        this.rank.active = true;
        this.over.active = false;
    },

    hideRank () {
        this.rank.active = false;
        this.over.active = true;

        if (gameManager.getGameState() === GAME_STATE.PAUSED) {
            this.over.getComponent('over').renderWatchVideoView();
        }
    },

    onPlayAgain () {
        this.hideOver();

        const state = gameManager.getGameState();

        const gameComponent = this.canvas.getComponent('game');
        if (state === GAME_STATE.PAUSED) {
            gameComponent.gameResume();
            gameComponent.gameOver();
        }

        gameComponent.gameReset();
        gameComponent.gameBegin();
    },

    onShowRank () {
        this.showRank();
    },

    onHideRank () {
        this.hideRank();
    },

    onShareVideo () {
        const has = gameManager.hasSharedVideo();
        if (!has) {
            gameManager.setHasSharedVideo();
        }

        if (!currentVideoPath) {
            showToast({ title: '视频准备中' });
        } else {
            if (userManager.isUserLogin() && tt.getUserInfo) {
                userManager.getLocalUserInfo({
                    success: res => {
                        const score = gameManager.getScore();
                        const { nickName, avatarUrl } = res.userInfo;
                        const query = `cat=normal&mode=battle&score=${score}&nickname=${nickName}&avatar=${avatarUrl}`;

                        rankManager.shareChallengeVideo({
                            videoPath: currentVideoPath,
                            query,
                            score,
                            success: (res) => {
                                console.log('发布成功');
                                showToast({ title: '成功发布挑战' });
                            },
                            fail: (err) => {
                                console.log('shareVideo fail.', err);
                            },
                        });
                    },
                    fail: err => {
                        console.log('getUserInfo 调用失败', err);
                    }
                });
            } else {
                userManager.login();
            }
        }
    },

    // update (dt) {},
});
