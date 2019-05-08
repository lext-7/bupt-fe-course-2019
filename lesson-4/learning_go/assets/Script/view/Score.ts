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

export type ScoreAction = {
    addScore: () => void;
    resetScore: () => void;
    getScore: () => number;
};

@ccclass
export default class Score extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;

    @property
    score: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.label = this.getComponent(cc.Label);
        this.label.string = `${this.score}`;
    }

    public addScore() {
        this.label.string = `${parseInt(this.label.string, 10) + 1}`;
    }

    public getScore() {
        return parseInt(this.label.string, 10);
    }

    public resetScore() {
        this.label.string = `${this.score}`;
    }
}
