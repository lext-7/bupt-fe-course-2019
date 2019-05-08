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

@ccclass
export default class Board extends cc.Component {
    @property(cc.Prefab)
    stonePrefab: cc.Prefab = null;

    stone: cc.Node;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        const chance = Math.random();
        if (chance < 0.2) {
            // 20%的几率生成上下移动石块
            this.appearStone();
            this.node.runAction(this.setJumpAction());
        } else if (0.2 < chance && chance < 0.3) {
            // 10%几率单石块
            this.appearStone();
        }
    }

    private setJumpAction = () => {
        // 可以参考第一节跳跃方法
        // 上升
        const jumpUp = cc.moveBy(Math.random() * 1 + 1, cc.v2(0, 50));
        // 下落
        const jumpDown = cc.moveBy(Math.random() * 1 + 1, cc.v2(0, -50));
        // 不断重复
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    };

    public appearStone() {
        const stone = cc.instantiate(this.stonePrefab);
        this.node.addChild(stone);
        this.stone = stone;
        stone.setPosition(new cc.Vec2(this.node.width / 2, stone.height));
    }
}
