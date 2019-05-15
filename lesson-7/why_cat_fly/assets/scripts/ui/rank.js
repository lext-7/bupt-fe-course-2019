const rankManager = require('../rank_manager');
const userManager = require('../user_manager');
const gameManager = require('../game_manager');

const { GAME_MODE } = gameManager;

const RANK_STATE = {
    NO_SCORE: 0,
    OUT_RANK: 1,
    IN_RANK: 2,
};

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        scrollview: cc.ScrollView,
        rankItem: cc.Prefab,
        titleWorld: cc.Node,
        titleBattle: cc.Node,
        bottomBoard: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.titleWorld.active = false;
        this.titleBattle.active = false;

        this.scrollview.node.on('scroll-to-top', this.onScrollviewScrollToTop, this);
    },

    start () {
        const gameMode = gameManager.getGameMode();
        if (gameMode === GAME_MODE.BATTLE) {
            this.titleBattle.active = true;
        }

        if (gameMode === GAME_MODE.NORMAL) {
            this.titleWorld.active = true;
        }
    },

    onEnable() {
        // 如果已经有数据，可以先渲染一下，随后刷新
        const info = rankManager.getLatestRankInfo();
        if (info) {
            this.renderRankList(info);
            this.renderSelfRank(info);
        }

        this.refreshRankList();
    },

    onDisable() {

    },

    onScrollviewScrollToTop() {
        this.refreshRankList();
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

    renderRankList(info) {
        const top = info.top;

        if (top) {
            this.content.removeAllChildren();
            for (let i = 0; i < top.length; i++) {
                const target = top[i];

                // TODO: 改写为 pool 方式
                const node = cc.instantiate(this.rankItem);
                this.content.addChild(node);
                node.setPosition(cc.v2(0, - 42 + i * -85));

                const component = node.getComponent('rank_item');
                component.render({
                    index: i + 1,
                    avatar: target.avatarUrl,
                    nickname: this.formatNickname(target.nickname),
                    score: target.score || 0,
                });
            }

            let contentHeight = 85 * top.length;

            // 让他始终可以滚动
            if (contentHeight < this.scrollview.node.height) {
                contentHeight = this.scrollview.node.height;
            }
            this.content.height = contentHeight;
        }
    },

    renderSelfRank(info) {
        if (userManager.isUserLogin() && tt.getUserInfo) {
            userManager.getLocalUserInfo({
                success: res => {
                    const { userInfo } = res;
                    console.log(`getUserInfo调用成功 ${userInfo}`);

                    this.bottomBoard.removeAllChildren();
                    const item = cc.instantiate(this.rankItem);
                    this.bottomBoard.addChild(item);

                    const component = item.getComponent('rank_item');
                    component.isSelf = true;

                    const { rank, rankState, score, percentage, top } = info;
                    let index = '999+';
                    let topScore = score;
                    if (rankState === RANK_STATE.IN_RANK && rank) {
                        index = rank;
                        if (!topScore && top.length > rank && top[rank]) topScore = top[rank].score;
                    } else {
                        if (!topScore) topScore = gameManager.getScore();
                    }

                    component.render({
                        index: index,
                        avatar: userInfo.avatarUrl,
                        nickname: this.formatNickname(userInfo.nickName),
                        score: topScore,
                    });
                },
                fail: err => {
                    console.log('getUserInfo 调用失败', err);
                }
            });
        } else {
            console.log('无法获取本人的头像等信息');
        }
    },

    refreshRankList() {
        if (userManager.isUserLogin()) {
            rankManager.getRankData({
                success: res => {
                    this.renderRankList(res);
                    this.renderSelfRank(res);
                },
                fail: err => {
                    showToast({ title: '获取失败', icon: 'none' });
                },
            });
        } else {
            showToast({ title: '需要登录', icon: 'none' });
        }
    },

    // update (dt) {},
});
