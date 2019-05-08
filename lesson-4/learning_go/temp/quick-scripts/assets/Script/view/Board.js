(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/view/Board.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f98603/9NxCwaRuZCRu157d', 'Board', __filename);
// Script/view/Board.ts

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
var block_1 = require("./const/block");
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stonePrefab = null;
        // @property(cc.String)
        // name: string = 'board'
        _this.hurt = 20;
        _this.getInfo = function () {
            var data = {
                name: _this.name,
                hurt: _this.hurt,
                type: block_1.BLOCK_TYPE.PLATFORM,
            };
            return data;
        };
        _this.setJumpAction = function () {
            // 可以参考第一节跳跃方法
            // 上升
            var jumpUp = cc.moveBy(Math.random() * 1 + 1, cc.v2(0, 50));
            // 下落
            var jumpDown = cc.moveBy(Math.random() * 1 + 1, cc.v2(0, -50));
            // 不断重复
            return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
        };
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Board.prototype.onLoad = function () {
        var chance = Math.random();
        if (chance < 0.1) {
            // 20%的几率生成上下移动石块
            this.appearStone();
            this.node.runAction(this.setJumpAction());
        }
        else if (0.2 < chance && chance < 0.3) {
            // 10%几率单石块
            this.appearStone();
        }
        else if (0.3 < chance && chance < 0.4) {
            this.node.runAction(this.setJumpAction());
        }
    };
    Board.prototype.appearStone = function () {
        var stone = cc.instantiate(this.stonePrefab);
        this.node.addChild(stone);
        this.stone = stone;
        stone.setPosition(new cc.Vec2(this.node.width / 2, stone.height));
    };
    __decorate([
        property(cc.Prefab)
    ], Board.prototype, "stonePrefab", void 0);
    __decorate([
        property(cc.Integer)
    ], Board.prototype, "hurt", void 0);
    Board = __decorate([
        ccclass
    ], Board);
    return Board;
}(cc.Component));
exports.default = Board;

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
        //# sourceMappingURL=Board.js.map
        