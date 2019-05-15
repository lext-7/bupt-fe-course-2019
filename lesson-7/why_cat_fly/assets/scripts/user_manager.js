let isLogin = false;
let userInfoRes = null;

function login ({ success, fail, complete } = {}) {
    tt.login({
        success (res) {
            console.log(`login调用成功 ${res.code}`);
            isLogin = true;

            if (success) success(res);
        },
        fail (err) {
            console.log('login调用失败');
            console.log(err);

            if (fail) fail(res);
        },
        complete (res) {
            if (complete) complete(res);
        },
    });
}

function isUserLogin () {
    return isLogin;
}

function getLocalUserInfo ({ success, fail, complete } = {}) {
    if (userInfoRes) {
        if (success) success(userInfoRes);
        return;
    }

    tt.getUserInfo({
        success: res => {
            userInfoRes = res;
            if (success) success(userInfoRes);
        },
        fail: err => {
            if (fail) fail(err);
        },
        complete: info => {
            if (complete) complete(info);
        },
    });
}

module.exports = {
    isUserLogin,
    login,
    getLocalUserInfo,
}
