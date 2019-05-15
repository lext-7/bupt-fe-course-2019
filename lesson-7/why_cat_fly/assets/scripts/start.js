const gameManager = require('game_manager');
const adManager = require('ad_manager');
const userManager = require('user_manager');
const rankManager = require('rank_manager');

const { currentRuntime, RUNTIME, GAME_MODE } = gameManager;
let currentBannerAd = null;

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if (currentRuntime === RUNTIME.TMG) {
            // NEED_FIX: 等 3s 加载广告
            // this.scheduleOnce(() => {
            //     console.log('in tmg runtime, loading ads.');
            //     currentBannerAd = adManager.getBannerAd();
            //     if (currentBannerAd) {
            //         console.log('显示横屏广告');
            //         currentBannerAd.show()
            //             .then(() => {
            //                 console.log('广告显示成功');
            //             })
            //             .catch(err => {
            //                 console.log('广告组件出现问题', err);
            //             });
            //     }
            // }, 3);

            // NOTE: 检测游戏类型，挑战 or 正常游戏
            const { query } = gameManager.getLaunchOptions();
            if (query.mode === 'battle') {
                console.log('挑战模式');
                gameManager.setGameMode(GAME_MODE.BATTLE);
                gameManager.setTargetScore(parseInt(query.score));

                // show toast
                showToast({ title: '成功加入挑战' });
            } else {
                console.log('一般模式');
            }

            // 预授权
            if (tt.getSetting && tt.authorize) {
                tt.getSetting({
                    success: res => {
                        if (!res.authSetting['scope.userInfo']) {
                            tt.authorize({
                                scope: 'scope.userInfo',
                            });
                        }
                        if (!res.authSetting['scope.record']) {
                            tt.authorize({
                                scope: 'scope.record',
                            });
                        }
                    }
                });
            }

            // 获取历史最高分
            gameManager.getBestScore();
        }
    },

    start () {
        // 预加载，点开始就不会卡顿了
        cc.director.preloadScene('game', () => {
            console.log('预加载成功.');
        });
    },

    onStartPressed () {
        if (currentRuntime === RUNTIME.TMG) {
            userManager.login({
                complete: () => {
                    this.enterGameScene();
                },
            });
        } else {
            this.enterGameScene();
        }
    },

    enterGameScene () {
        cc.director.loadScene('game', () => {
            this.cleanScene();
        });
    },

    cleanScene () {
        console.log('clean start scene.');

        // clean ad
        if (currentBannerAd) {
            currentBannerAd.destroy();
        }
    },

    // update (dt) {},
});
