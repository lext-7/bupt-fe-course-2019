(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/view/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ac40d5Bgl5GhLX1mUs6P4sQ', 'Player', __filename);
// Script/view/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BgMove_1 = require("./BgMove");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = null;
        // @property(cc.Boolean)
        // dead: boolean = false;
        // 跑步状态
        _this.running = false;
        // 跳跃相关
        _this.jumpLevel = 0; // 允许二段跳 max 2
        // 跳跃状态
        _this.jumping = false;
        // 允许几段跳 max - 1
        _this.jumpMax = 3;
        // 跳跃的初始化速度
        _this.jumpSpeed = 0;
        // 定义地面
        _this.groundY = 0;
        // 速度
        _this.speed = cc.v2(200, 0);
        // 最大速度
        _this.maxSpeed = cc.v2(400, 2000);
        // 横向加速度
        _this.accel = 100;
        // 重力
        _this.gravity = -3000;
        _this.bg = null;
        // 碰撞相关
        _this.collisionX = 0;
        _this.collisionY = 0;
        // 移动函数
        _this.move = function (dt) {
            if (_this.running && _this.collisionX === 0) {
                // 正向移动判断
                if (_this.speed.x < _this.maxSpeed.x) {
                    // 速度逐渐加快
                    _this.speed.x += _this.accel * dt;
                }
                // 先跑到屏幕中间
                if (_this.node.x < _this.node.parent.width / 2) {
                    _this.node.x += _this.speed.x * dt;
                }
                else {
                    _this.bgComponent.bgMove(_this.speed.x * dt); // x移动是通过背景移动进行
                }
            }
            if (_this.jumping && _this.jumpLevel < _this.jumpMax) {
                // 检测跳跃
                _this.speed.y += _this.gravity * dt;
                if (Math.abs(_this.speed.y) > _this.maxSpeed.y) {
                    // 限制最大跳跃速度
                    _this.speed.y =
                        _this.speed.y > 0 ? _this.maxSpeed.y : -_this.maxSpeed.y;
                }
                _this.node.y += _this.speed.y * dt;
            }
            // 平面检测
            if (_this.node.y <= _this.groundY) {
                _this.node.y = _this.groundY;
                _this.jumpLevel = 0;
                _this.jumping = false;
            }
        };
        return _this;
    }
    // 销毁时
    Player.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // 按下播放跑动动画
                this.getComponent(cc.Animation).play('player_run');
                this.running = true;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // 拿起停止动画
                this.getComponent(cc.Animation).stop('player_run');
                this.running = false;
                this.speed.x = 200;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (this.jumpLevel < this.jumpMax - 1) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
                    ++this.jumpLevel;
                }
                break;
        }
    };
    Player.prototype.init = function () {
        this.birth();
        this.GameComponent = this.game.getComponent('Game');
        this.groundY = this.node.y; // 设置地板位置
        this.bgComponent = this.bg.getComponent('BgMove'); // 获取背景
        // 碰撞检测
        this.collisionX = 0; //x轴是否碰撞，0：没有碰撞，-1：左方有碰撞，1：右方有碰撞
        this.collisionY = 0;
    };
    Player.prototype.dead = function () {
        this.node.x = -999; // 移出屏幕
        this.getComponent(cc.Animation).stop('player_run');
        this.running = false;
        this.speed.x = 200;
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.birth = function () {
        this.node.x = 200;
        this.node.y = 104;
        // 设置键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.onCollisionEnter = function (other, self) {
        var _this = this;
        if (other.node.group === 'blank') {
            // 遇见空白时 直接返回 并且是跳跃状态
            if (!this.jumping) {
                this.jumping = true;
            }
            return;
        }
        if (other.node.group === 'stone') {
            // 遇见石头 结束游戏
            this.dead();
            this.GameComponent.overGame();
            return;
        }
        // 碰撞进入
        var otherAabb = other.world.aabb;
        var otherPreAabb = other.world.preAabb.clone(); // 上一帧碰撞框
        var selfAabb = self.world.aabb;
        var selfPreAabb = self.world.preAabb.clone();
        // 我们需要退回上一步的状态 先判断x的碰撞
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;
        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            // 检查x碰撞
            if (this.speed.x > 0) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - 1;
            }
            this.collisionX = 1;
            other.touchingX = true;
            return;
        }
        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;
        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                this.node.y = otherPreAabb.yMax;
                this.jumpLevel = 0;
                this.collisionY = -1;
                Object.keys(BgMove_1.level).forEach(function (item) {
                    // 到达平台 不做掉落判断
                    if (BgMove_1.level[item] + other.node.height / 2 === _this.node.y) {
                        _this.jumping = false;
                    }
                });
            }
            else if (this.speed.y > 0 &&
                selfPreAabb.yMin < otherPreAabb.yMin) {
                this.node.y =
                    otherPreAabb.yMin -
                        selfPreAabb.height -
                        other.node.height / 2;
                this.collisionY = 1;
            }
            this.speed.y = 0;
            other.touchingY = true;
        }
    };
    Player.prototype.onCollisionExit = function (other, self) {
        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    };
    Player.prototype.onLoad = function () {
        this.init();
    };
    Player.prototype.update = function (dt) {
        // 角色移动
        this.move(dt);
    };
    __decorate([
        property(cc.Node)
    ], Player.prototype, "game", void 0);
    __decorate([
        property(cc.Boolean)
    ], Player.prototype, "running", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpLevel", void 0);
    __decorate([
        property(cc.Boolean)
    ], Player.prototype, "jumping", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpMax", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpSpeed", void 0);
    __decorate([
        property()
    ], Player.prototype, "groundY", void 0);
    __decorate([
        property(cc.Vec2)
    ], Player.prototype, "speed", void 0);
    __decorate([
        property(cc.Vec2)
    ], Player.prototype, "maxSpeed", void 0);
    __decorate([
        property()
    ], Player.prototype, "accel", void 0);
    __decorate([
        property()
    ], Player.prototype, "gravity", void 0);
    __decorate([
        property(cc.Node)
    ], Player.prototype, "bg", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "collisionX", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "collisionY", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Player.js.map
        