const RUNTIME = {
    BROWSER: 1,
    TMG: 2,
    WX: 3,
};

let currentRuntime = RUNTIME.BROWSER;
window.showToast = console.log;

if (typeof tt === 'object') {
    currentRuntime = RUNTIME.TMG;
    window.showToast = tt.showToast;
} else if(typeof wx === 'object') {
    currentRuntime = RUNTIME.WX;
    window.showToast = wx.showToast;
}

let launchOptions;
function getLaunchOptions() {
    if (!launchOptions) {
        launchOptions = tt.getLaunchOptionsSync();
    }
    return launchOptions;
}

let duration = 0;
function setDuration(duration) {
    duration = duration;
}
function getDuration() {
   return duration;
}

let score = 0;
let callbackForScoreChange;
function setScore(score) {
    score = score;

    if (callbackForScoreChange) callbackForScoreChange(score);
}
function getScore() {
    return score;
}
function addScore(value) {
    score += value;

    if (callbackForScoreChange) callbackForScoreChange(score);
}
function onScoreChange(cb) {
    callbackForScoreChange = cb;
}

let timerForGameDuration;
const GAME_STATE = {
    INIT: 0,
    PLAYING: 1,
    OVER: 2,
    PAUSED: 3,
};
let gameState = GAME_STATE.INIT;
function gameBegin() {
    gameState = GAME_STATE.PLAYING;
    timerForGameDuration = setInterval(() => {
        if (gameState === GAME_STATE.PLAYING) {
            duration++;
        }
    }, 1000);
}
function gameOver() {
    gameState = GAME_STATE.OVER;
    clearInterval(timerForGameDuration);
}
function gameReset() {
    gameState = GAME_STATE.INIT;
    duration = 0;
    score = 0;
    weaponTNTCount = 0;
    retryTimes = 0;

    if (callbackForScoreChange) callbackForScoreChange(score);
    if (callbackForWeaponTNTCountChange) callbackForWeaponTNTCountChange(weaponTNTCount);
}
function gamePause() {
    gameState = GAME_STATE.PAUSED;
}
function gameResume() {
    gameState = GAME_STATE.PLAYING;
}
function getGameState() {
    return gameState;
}

const GAME_MODE = {
    NORMAL: 1,
    BATTLE: 2,
}
let gameMode = GAME_MODE.NORMAL;
function getGameMode() {
    return gameMode;
}
function setGameMode(mode) {
    gameMode = mode;
}

let targetScore = 0;
function getTargetScore() {
    return targetScore;
}
function setTargetScore(score = 0) {
    targetScore = score;
}

let callbackForVideoRecorded;
function videoRecorded(res) {
    if (res && res.videoPath) {
        if (callbackForVideoRecorded)
            callbackForVideoRecorded(res.videoPath);
    }
}
function onVideoRecorded(cb) {
    callbackForVideoRecorded = cb;
}

let weaponTNTCount = 0;
let callbackForWeaponTNTCountChange;
function getWeaponTNTCount() {
    return weaponTNTCount;
}
function setWeaponTNTCount(count) {
    weaponTNTCount = count;

    if (callbackForWeaponTNTCountChange)
        callbackForWeaponTNTCountChange(weaponTNTCount);
}
function addWeaponTNTCount(value) {
    weaponTNTCount += value;

    if (callbackForWeaponTNTCountChange)
        callbackForWeaponTNTCountChange(weaponTNTCount);
}
function onWeaponTNTCountChange(cb) {
    callbackForWeaponTNTCountChange = cb;
}

let retryTimes = 0;
function getRetryTimes() {
    return retryTimes;
}
function addRetryTimes() {
    retryTimes += 1;
}

const BEST_SCORE_TAG = 'why_cat_fly_best_score';
function getBestScore() {
    let score = 0;
    try {
        score = parseInt(tt.getStorageSync(BEST_SCORE_TAG));
    } catch (err) {
        console.log('获取最高分失败');
        console.log(err);
    }
    return score || 0;
}
function setBestScore(score) {
    const oldScore = getBestScore();
    if (score > oldScore) {
        tt.setStorageSync(BEST_SCORE_TAG, score);
    }
}

const USER_ACTION_HAS_SHARED = 'user_action_have_shared';
function hasSharedVideo() {
    let has = false;

    try {
        has = !!tt.getStorageSync(USER_ACTION_HAS_SHARED);
    } catch (err) {
        console.log('获取用户动作失败');
        console.log(err);
    }

    return has;
}
function setHasSharedVideo(bool = true) {
    try {
        tt.setStorageSync(USER_ACTION_HAS_SHARED, bool);
    } catch (err) {
        console.log('设置用户动作失败');
        console.log(err);
    }
}

module.exports = {
    RUNTIME,
    currentRuntime,

    setDuration,
    getDuration,

    setScore,
    getScore,
    addScore,
    onScoreChange,

    GAME_STATE,
    gameBegin,
    gameOver,
    gameReset,
    gamePause,
    gameResume,
    getGameState,

    GAME_MODE,
    getGameMode,
    setGameMode,

    getTargetScore,
    setTargetScore,

    getLaunchOptions,

    videoRecorded,
    onVideoRecorded,

    getWeaponTNTCount,
    setWeaponTNTCount,
    addWeaponTNTCount,
    onWeaponTNTCountChange,

    getRetryTimes,
    addRetryTimes,

    getBestScore,
    setBestScore,

    hasSharedVideo,
    setHasSharedVideo,
};
