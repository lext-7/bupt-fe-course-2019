// NOTE: 目前只用到一个分数排行榜，故只有一个 rankKey
const RANK_KEY = 'rank_for_score';

function shareChallengeVideo({ videoPath, query, score = 0, success, fail }) {
    if (!tt.shareVideo) {
        console.log('不支持 tt.shareVideo 接口');
        if (fail) fail({ errMsg: '不支持 tt.shareVideo 接口' });
        return;
    }

    tt.shareVideo({
        videoPath,
        query,
        title: `在游戏中获得了 ${score} 分，快来挑战 Ta`,
        extra: {
            createChallenge: true,
            rankData: {
                key: RANK_KEY,
                score,
                updateTime: ~~(Date.now() / 1000),
                extra: {
                    origin: 'share-video',
                },
            }
        },
        success,
        fail,
    });
}

// NOTE: 这些是测试数据，偶尔可以用用
// const top = [
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
//     {score: 1, nickname: '111', aid: 13},
// ];
// let latestRankInfo = { top };
let latestRankInfo;
let topScore = 0;
function getRankData({ success, fail }) {
    if (!tt.getRankData) {
        console.log('不支持 tt.getRankData 接口');
        if (fail) fail({ errMsg: '不支持 tt.getRankData 接口' });
        return;
    }

    tt.getRankData({
        key: RANK_KEY,
        // cloudStorageKeyList: ['testone', 'testtwo'], // TODO: 不知道什么用处
        success: res => {
            latestRankInfo = res;
            console.log('getRankData success', res);

            let top = res.top;
            if (top && top.length > 0) {
                topScore = res.top[0].score;
            }

            if (success) success(res, topScore);
        },
        fail: err => {
            console.log('getRankData fail', err);

            if (fail) fail(err);
        },
    });
}

function getLatestRankInfo() {
    return latestRankInfo;
}

function getTopScore() {
    return topScore;
}

function setRankData({ score = 0, success, fail }) {
    if (!tt.setRankData) {
        console.log('不支持 tt.setRankData 接口');
        if (fail) fail({ errMsg: '不支持 tt.setRankData 接口' });
        return;
    }

    tt.setRankData({
        key: RANK_KEY,
        score: score,
        updateTime: ~~(Date.now() / 1000),
        extra: {
            origin: 'set-rank',
        },
        success: res => {
            console.log('setRankData success', res);
            if (success) success(res);
        },
        fail: err => {
            console.log('setRankData fail', err);

            if (fail) fail(err);
        }
    });
}

module.exports = {
    shareChallengeVideo,
    getRankData,
    setRankData,
    getLatestRankInfo,
    getTopScore,
};
