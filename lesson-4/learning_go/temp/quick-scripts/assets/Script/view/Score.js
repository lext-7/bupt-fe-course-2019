(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/view/Score.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c8b09KxtM9Lj5W8Ezyjko91', 'Score', __filename);
// Script/view/Score.ts

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
var Score = /** @class */ (function (_super) {
    __extends(Score, _super);
    function Score() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.score = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Score.prototype.onLoad = function () {
        this.label = this.getComponent(cc.Label);
        this.label.string = "" + this.score;
    };
    Score.prototype.addScore = function () {
        this.label.string = "" + (parseInt(this.label.string, 10) + 1);
    };
    Score.prototype.getScore = function () {
        return parseInt(this.label.string, 10);
    };
    Score.prototype.resetScore = function () {
        this.label.string = "" + this.score;
    };
    __decorate([
        property(cc.Label)
    ], Score.prototype, "label", void 0);
    __decorate([
        property
    ], Score.prototype, "score", void 0);
    Score = __decorate([
        ccclass
    ], Score);
    return Score;
}(cc.Component));
exports.default = Score;

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
        //# sourceMappingURL=Score.js.map
        