"use strict";
cc._RF.push(module, '33f97wJ98pEq6bcmgLtnTHH', 'OverPanel');
// Script/view/OverPanel.ts

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
var OverPanel = /** @class */ (function (_super) {
    __extends(OverPanel, _super);
    function OverPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.game = null;
        _this.overScore = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    OverPanel.prototype.onLoad = function () {
        this.GameComponent = this.game.getComponent('Game');
        this.node.active = false;
    };
    OverPanel.prototype.show = function (score) {
        this.node.active = true;
        this.overScore.string = "\u5F97\u5206\uFF1A" + score;
    };
    __decorate([
        property(cc.Node)
    ], OverPanel.prototype, "game", void 0);
    __decorate([
        property(cc.Label)
    ], OverPanel.prototype, "overScore", void 0);
    OverPanel = __decorate([
        ccclass
    ], OverPanel);
    return OverPanel;
}(cc.Component));
exports.default = OverPanel;

cc._RF.pop();