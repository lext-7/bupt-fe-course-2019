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

import { ScoreAction } from '../view/Score';
import { PlayerAction } from '../view/Player';
import { OverPanelAction } from '../view/OverPanel';

export type GameAction = {
    addScore: () => void;
    overGame: () => void;
    startGame: () => void;
};

@ccclass
export default class Game extends cc.Component {
    ScoreComponent: ScoreAction;
    PlayerComponent: PlayerAction;
    OverPanelComponent: OverPanelAction;

    @property(cc.Node)
    score: cc.Node = null;

    @property(cc.Node)
    overPanel: cc.Node = null;

    @property(cc.Node)
    player: cc.Node = null;

    onLoad() {
        const manager = cc.director.getCollisionManager(); // 开启碰撞
        manager.enabled = true;

        this.ScoreComponent = this.score.getComponent('Score');
        this.PlayerComponent = this.player.getComponent('Player');
        this.OverPanelComponent = this.overPanel.getComponent('OverPanel');
    }

    public addScore() {
        this.ScoreComponent.addScore();
    }

    public overGame() {
        this.OverPanelComponent.show(this.ScoreComponent.getScore());
    }

    public startGame() {
        this.ScoreComponent.resetScore();
        this.PlayerComponent.birth();
        this.overPanel.active = false;
    }
}
