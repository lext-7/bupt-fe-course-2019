const _ = require('lodash');

let videoAd = null;

// 因为全局视频广告是唯一的。
function getVideoAd() {
    if (!videoAd && tt.createRewardedVideoAd) {
        videoAd = new tt.createRewardedVideoAd({ adUnitId: 'adunit-iegfidbai31k83fe0c' });
    }

    return videoAd;
}

function getBannerAd(opt) {
    if (!tt.createBannerAd) return;

    // 获取设备宽高
    // Banner广告一般的比例为16:9，最小宽度是160（设备像素），最宽不超过屏幕宽度。
    const { screenWidth = 360, screenHeight = 640 } = tt.getSystemInfoSync();
    const adWidth = screenWidth * 515 / 750;
    const style = {
        left: (screenWidth - adWidth) / 2,
        top: screenHeight * 1134 / 1334,
        width: adWidth,
    };

    let props = _.assign({ adUnitId: 'adunit-3nkdfnmm20i516g3ii', style }, opt);
    console.log(props);
    return new tt.createBannerAd(props);
}

function showVideoAd({ success, fail }) {
    if (!videoAd) return;

    videoAd.show()
        .then(() => {
            console.log('广告显示成功');
            if (success) success();
        })
        .catch(err => {
            console.log('广告组件出现问题', err);
            console.log('尝试手动再加载一次');

            // 如果出现问题了，可以手动加载一次
            videoAd.load()
                .then(() => {
                    console.log('手动加载成功');
                    if (success) success();
                })
                .catch(err => {
                    console.log('第二次尝试失败');
                    if (fail) fail(err);
                });
        });
}

function onVideoAdEnd(cb) {
    if (!videoAd) return;

    videoAd.onClose(res => {
        // res.isEnded 是否看完广告
        cb(res);
    });
}

module.exports = {
  getVideoAd,
  getBannerAd,
  showVideoAd,
  onVideoAdEnd,
};
