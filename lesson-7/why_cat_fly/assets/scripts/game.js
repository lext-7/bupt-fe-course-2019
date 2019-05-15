const gameManager = require('game_manager');
const rankManager = require('rank_manager');
const adManager = require('ad_manager');

const { currentRuntime, RUNTIME, GAME_MODE, GAME_STATE } = gameManager;

let recorderManager;
let currentBannerAd;

cc.Class({
    extends: cc.Component,

    properties: {
        catPrefab: {
            default: null,
            type: cc.Prefab,
        },
        cloudGroup: {
            default: null,
            type: require('cloud_group'),
        },
        bulletGroup: {
            default: null,
            type: require('bullet_group'),
        },
        candyGroup: {
            default: null,
            type: require('candy_group'),
        },
        weaponGroup: {
            default: null,
            type: require('weapon_group'),
        },
        ui: {
            default: null,
            type: cc.Node,
        },

        scoreRoot: cc.Node,
        battleScoreRoot: cc.Node,
        score: {
            default: [],
            type: cc.Label,
        },
        battleScore: cc.Label,

        tntCount: cc.Label,
        touchArea: cc.Node,
        catRoot: cc.Node,
        sky: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.audioEngine.setMaxAudioInstance(10);

        gameManager.onScoreChange((score) => {
            this.renderScore(score);
        });
        gameManager.onWeaponTNTCountChange((count) => {
            this.renderWeaponTNTCount(count);
        });

        this.prepareGameMode();

        if (currentRuntime === RUNTIME.TMG) {
            this.prepareVideoRecorder();
            this.prepareVideoAd();
        }
    },

    onDrag () {
        this.touchArea.on('touchmove', this.onHandleCatMove, this);
    },

    offDrag () {
        this.touchArea.off('touchmove', this.onHandleCatMove, this);
    },

    start () {
        this.gameBegin();
    },

    renderScore (score) {
        for (let i = 0; i < this.score.length; i++) {
            this.score[i].string = score;
        }
    },

    renderWeaponTNTCount (count) {
        this.tntCount.string = count;
    },

    gameReset () {
        gameManager.gameReset();
        this.ui.getComponent('ui').cleanVideoPath();
    },

    gameBegin () {
        this.onDrag();

        this.catBorn();
        this.skyMove();

        gameManager.gameBegin();
        this.candyGroup.startAction();
        this.bulletGroup.startAction();
        this.weaponGroup.startAction();
        this.cloudGroup.startAction();

        this.startRecord();

        // 为了调 UI
        // setTimeout(() => {
        //     this.gameOver();
        // }, 3000);
        //
        // setTimeout(() => {
        //     this.gamePause();
        // }, 3000);
        //
        // setTimeout(() => {
        //     this.gameResume();
        // }, 6000);
    },

    showGameOverUI () {
        this.ui.getComponent('ui').showOver();
    },

    gameOver () {
        this.offDrag();

        this.catDie();
        this.skyStop();

        gameManager.gameOver();
        this.candyGroup.stopAction();
        this.bulletGroup.stopAction();
        this.weaponGroup.stopAction();
        this.cloudGroup.stopAction();

        if (recorderManager) recorderManager.stop();

        if (currentRuntime === RUNTIME.TMG) {
            // 刷新排行榜分数
            const score = gameManager.getScore();
            console.log(`得分：${score}`);
            rankManager.setRankData({
                score,
            });

            // 保存最高分
            gameManager.setBestScore(score);
        }
    },

    gamePause () {
        const gameState = gameManager.getGameState();
        if (gameState === GAME_STATE.PAUSED) return;

        gameManager.gamePause();
        this.candyGroup.pauseAction();
        this.bulletGroup.pauseAction();
        this.weaponGroup.pauseAction();
        this.cloudGroup.pauseAction();

        // 录屏还不支持暂停
        // if (recorderManager) recorderManager.pause();
    },

    gameResume () {
        const gameState = gameManager.getGameState();
        if (gameState === GAME_STATE.PLAYING) return;

        gameManager.gameResume();
        this.candyGroup.resumeAction();
        this.bulletGroup.resumeAction();
        this.weaponGroup.resumeAction();
        this.cloudGroup.resumeAction();

        // 录屏还不支持继续
        // if (recorderManager) recorderManager.resume();
    },

    prepareVideoRecorder () {
        if (currentRuntime === RUNTIME.TMG) {
            // start recorder
            if (tt.getGameRecorderManager) {
                recorderManager = tt.getGameRecorderManager();

                recorderManager.onStart((res) => {
                    console.log('recorder start.', res);
                });

                recorderManager.onStop((res) => {
                    console.log('recorder stop.', res);
                    gameManager.videoRecorded(res);
                });

                recorderManager.onError((err) => {
                    console.log('recorder error.', err);
                    showToast({ title: '录屏出错', icon: 'none' });
                });

                recorderManager.onInterrupted((err) => {
                    console.log('recorder interrupted.', err);
                    showToast({ title: '录屏异常', icon: 'none' });
                });
            }
        }
    },

    startRecord () {
        if (recorderManager) {
            tt.getSetting({
                success: res => {
                    let enableRecord = false;
                    if (res.authSetting['scope.record']) {
                        enableRecord = true;
                    }

                    recorderManager.start({
                        microphoneEnabled: enableRecord,
                        duration: 120,
                    });
                }
            });
        }
    },

    prepareGameMode () {
        const gameMode = gameManager.getGameMode();
        if (gameMode === GAME_MODE.BATTLE) {
            this.battleScoreRoot.active = true;
            this.scoreRoot.active = false;

            const targetScore = gameManager.getTargetScore();
            this.battleScore.string = targetScore;
        } else {
            this.battleScoreRoot.active = false;
            this.scoreRoot.active = true;
        }
    },

    cleanAllCandies () {
        const allCandies = this.candyGroup.node.children;
        for (let i = 0; i < allCandies.length; i++) {
            const component = allCandies[i].getComponent('candy');
            gameManager.addScore(component.score);
            component.candyHp = 0;
            component.boom();
        }
    },

    onUseWeaponTNT () {
        const count = gameManager.getWeaponTNTCount();
        if (count > 0) {
            this.cleanAllCandies();
            gameManager.addWeaponTNTCount(-1);
        }
    },

    onHandleCatMove (event) {
        let deltaX = event.getDeltaX();
        const cat = this.catRoot.children[0];
        if (cat) {
            // left
            if (deltaX < 0) {
                if (cat.getPosition().x + deltaX <= - this.catRoot.width / 2 + cat.width / 2) {
                    return;
                }
            }

            // right
            if (deltaX > 0) {
                if (cat.getPosition().x + deltaX >= this.catRoot.width / 2 - cat.width / 2) {
                    return;
                }
            }
            cat.setPosition(cat.getPosition().add(cc.v2(deltaX, 0)));
        }
    },

    catBorn () {
        this.catRoot.removeAllChildren();

        const cat = cc.instantiate(this.catPrefab);
        const component = cat.getComponent('cat');
        component.bulletGroup = this.bulletGroup;
        component.gameScript = this;

        this.catRoot.addChild(cat);
        cat.setPosition(0, 0);

        this.bulletGroup.cat = cat;
    },

    catDie () {
        this.catRoot.removeAllChildren();
    },

    onWatchVideoAd () {
        this.showVideoAd();

        // 测试用
        this.oneMoreChance();
    },

    showWatchVideoView () {
        this.catDie();
        this.gamePause();

        const component = this.ui.getComponent('ui');
        component.showOverVideoAd();
    },

    oneMoreChance () {
        const gameState = gameManager.getGameState();
        if (gameState === GAME_STATE.PLAYING) return;

        gameManager.addRetryTimes();
        this.gameResume();
        this.catBorn();
        this.cleanAllCandies();

        const component = this.ui.getComponent('ui');
        component.hideOver();
    },

    skyMove () {
        this.skySpeed = this.sky.height / 180;
    },

    skyStop () {
        this.sky.y = - this.node.height / 2;
        this.skySpeed = 0;
    },

    showBannerAd () {
        if (!currentBannerAd) currentBannerAd = adManager.getBannerAd();

        if (!currentBannerAd) {
            console.log('无法创建广告实例');
            return;
        }

        currentBannerAd.show()
            .then(() => {
                console.log('广告显示成功');
            })
            .catch(err => {
                console.log('广告组件出现问题', err);
            });
    },

    hideBannerAd () {
        if (currentBannerAd) currentBannerAd.hide();
    },

    showVideoAd () {
        if (currentRuntime !== RUNTIME.TMG) return;

        adManager.showVideoAd({
            fail: (err) => {
                showToast({ title: '无法获取广告', icon: 'none' });
            },
        });
    },

    prepareVideoAd () {
        const gameMode = gameManager.getGameMode();
        if (gameMode === GAME_MODE.NORMAL) {
            adManager.getVideoAd();
            this.bindVideoAdEndCallback();
        }
    },

    bindVideoAdEndCallback () {
        adManager.onVideoAdEnd((res) => {
            if (res && res.isEnded) {
                this.oneMoreChance();
            } else {
                showToast({ title: '广告被中断', icon: 'none' });
            }
        });
    },

    update (dt) {
        if (gameManager.getGameState() === GAME_STATE.PAUSED) return;

        if (this.skySpeed) {
            if (this.sky.y >= this.node.height - this.sky.height) {
                this.sky.y -= dt * this.skySpeed;
            }
        }
    },
});
