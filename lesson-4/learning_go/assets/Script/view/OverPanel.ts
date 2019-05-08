// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

import { GameAction } from '../controller/Game';

export type OverPanelAction = {
    show: (socre: number) => void;
};

@ccclass
export default class OverPanel extends cc.Component {
    GameComponent: GameAction;

    @property(cc.Node)
    game: cc.Node = null;

    @property(cc.Label)
    overScore: cc.Label = null;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.GameComponent = this.game.getComponent('Game');
        this.node.active = false;
    }

    public show(score: number) {
        this.node.active = true;
        this.overScore.string = `得分：${score}`
    }

    // update (dt) {}
}
