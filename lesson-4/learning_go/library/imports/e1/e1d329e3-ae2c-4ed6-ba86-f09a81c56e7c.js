"use strict";
cc._RF.push(module, 'e1d32njrixO1rqG8JqBxW58', 'BgMove');
// Script/view/BgMove.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
// 每一层平台的 y 值
exports.level = {
    1: 250,
    2: 420,
    3: 590,
};
var BgMove = /** @class */ (function (_super) {
    __extends(BgMove, _super);
    function BgMove() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = null;
        // 作为两张背景图存储数组
        _this.bgList = [];
        return _this;
    }
    BgMove.prototype.onLoad = function () {
        this.GameComponent = this.game.getComponent('Game');
        // 初始化背景位置
        this.bgList = [this.node.children[0], this.node.children[1]];
        this.bgList[1].setPosition(this.node.width, 0);
        this.initMap(this.bgList[0]);
        this.initMap(this.bgList[1]);
    };
    BgMove.prototype.bgMoveY = function (speed) {
        // 上下移动不用检查拼接
        this.bgList.forEach(function (bg) {
            bg.y -= speed;
        });
    };
    // 背景两张图片移动
    BgMove.prototype.bgMove = function (speed) {
        this.bgList.forEach(function (bg) {
            bg.x -= speed;
        });
        this.checkBgReset();
    };
    // 检查第一张图是否超出容器，若超出，将第一张图放到第二张图后
    BgMove.prototype.checkBgReset = function () {
        // 获取第一张背景图的最右位置
        var firstXMax = this.bgList[0].getBoundingBox().xMax;
        // 如果第一张背景图完全移动到屏幕之外，将第一张背景图移到第二张背景图的后面
        // 第一张背景图和第二张背景图交换位置
        if (firstXMax <= 0) {
            // 过一张图加一分
            this.GameComponent.addScore();
            // 第一张图出队列
            var preFirstBg = this.bgList.shift();
            // 消除背景图上障碍
            preFirstBg.destroyAllChildren();
            this.bgList.push(preFirstBg);
            var curFirstBg = this.bgList[0];
            // 重置位置
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
            this.initMap(preFirstBg);
        }
    };
    // 初始化地图
    BgMove.prototype.initMap = function (bg) {
        var _this = this;
        var locationArray = [];
        // 获取背景的宽度
        var bgWidth = bg.width;
        // 创建一个不显示的石台实例，获取它的宽度
        var board = cc.instantiate(this.boardPrefab);
        var boardWidth = board.width;
        // 获取最多可以填充平台数量，数量不能超过这个值
        var index = Math.floor(bgWidth / boardWidth);
        // 随机一个地图块
        Object.keys(exports.level).forEach(function (key) {
            var arr = _this.initLocationArray(index - 1, 0, exports.level[key], boardWidth);
            locationArray.push.apply(locationArray, arr);
        });
        locationArray.forEach(function (item) {
            if (item.type === 'board') {
                var board_1 = cc.instantiate(_this.boardPrefab);
                bg.addChild(board_1);
                board_1.setPosition(item.position);
            }
            else if (item.type === 'blank') {
                var board_2 = cc.instantiate(_this.blankPrefab);
                bg.addChild(board_2);
                board_2.setPosition(item.position);
            }
        });
    };
    // 随机生成石台
    BgMove.prototype.initLocationArray = function (
    // 一层容纳的最大数量;
    index, 
    // 初始化的x值;
    xBegin, 
    // y的位置
    y, 
    // 一个石台的位置
    boardWidth) {
        // 30%的几率生成空
        var perLocationArray = Array.apply(null, { length: index }).map(function () {
            // 80%概率生成平台
            return Math.random() < 0.7 ? true : false;
        });
        var locationArray = [];
        perLocationArray[index] = true;
        perLocationArray = perLocationArray.map(function (item, idx) {
            if (item === false && perLocationArray[idx + 1] === false) {
                return true;
            }
            return item;
        });
        // 根据初始化数组 初始化坐标
        perLocationArray.forEach(function (item, index) {
            if (item === true) {
                var data = {
                    position: new cc.Vec2(xBegin + boardWidth * index, y),
                    type: 'board',
                };
                locationArray.push(data);
            }
            else {
                var data = {
                    position: new cc.Vec2(xBegin + boardWidth * index, y),
                    type: 'blank',
                };
                locationArray.push(data);
            }
        });
        return locationArray;
    };
    __decorate([
        property(cc.Node)
    ], BgMove.prototype, "game", void 0);
    __decorate([
        property(cc.Prefab)
    ], BgMove.prototype, "boardPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], BgMove.prototype, "blankPrefab", void 0);
    BgMove = __decorate([
        ccclass
    ], BgMove);
    return BgMove;
}(cc.Component));
exports.default = BgMove;

cc._RF.pop();