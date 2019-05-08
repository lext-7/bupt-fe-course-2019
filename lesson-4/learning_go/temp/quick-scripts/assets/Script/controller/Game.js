(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/controller/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e3cf2vdnLVPLZyjXXutNaKP', 'Game', __filename);
// Script/controller/Game.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.score = null;
        _this.overPanel = null;
        _this.player = null;
        return _this;
    }
    Game.prototype.onLoad = function () {
        var manager = cc.director.getCollisionManager(); // 开启碰撞
        manager.enabled = true;
        this.ScoreComponent = this.score.getComponent('Score');
        this.PlayerComponent = this.player.getComponent('Player');
        this.OverPanelComponent = this.overPanel.getComponent('OverPanel');
    };
    Game.prototype.addScore = function () {
        this.ScoreComponent.addScore();
    };
    Game.prototype.overGame = function () {
        this.OverPanelComponent.show(this.ScoreComponent.getScore());
    };
    Game.prototype.startGame = function () {
        this.ScoreComponent.resetScore();
        this.PlayerComponent.birth();
        this.overPanel.active = false;
    };
    __decorate([
        property(cc.Node)
    ], Game.prototype, "score", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "overPanel", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

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
        //# sourceMappingURL=Game.js.map
        