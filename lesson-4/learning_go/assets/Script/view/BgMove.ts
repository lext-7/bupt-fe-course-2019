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

// 每一层平台的 y 值
export const level = {
    1: 250,
    2: 420,
    3: 590,
};

type locationArrayItem = {
    position: cc.Vec2;
    type: string;
};

export type BgMoveAction = {
    bgMove(speed: number): void;
    bgMoveY(speed: number): void;
};

@ccclass
export default class BgMove extends cc.Component {
    GameComponent: GameAction;

    @property(cc.Node)
    game: cc.Node = null;

    // 预设地图资源
    @property(cc.Prefab)
    boardPrefab: cc.Prefab;

    @property(cc.Prefab)
    blankPrefab: cc.Prefab;

    // 作为两张背景图存储数组
    bgList: cc.Node[] = [];

    onLoad() {
        this.GameComponent = this.game.getComponent('Game');

        // 初始化背景位置
        this.bgList = [this.node.children[0], this.node.children[1]];
        this.bgList[1].setPosition(this.node.width, 0);
        this.initMap(this.bgList[0]);
        this.initMap(this.bgList[1]);
    }

    bgMoveY(speed: number) {
        // 上下移动不用检查拼接
        this.bgList.forEach(bg => {
            bg.y -= speed;
        });
    }

    // 背景两张图片移动
    bgMove(speed: number) {
        this.bgList.forEach(bg => {
            bg.x -= speed;
        });
        this.checkBgReset();
    }

    // 检查第一张图是否超出容器，若超出，将第一张图放到第二张图后
    checkBgReset() {
        // 获取第一张背景图的最右位置
        const firstXMax = this.bgList[0].getBoundingBox().xMax;
        // 如果第一张背景图完全移动到屏幕之外，将第一张背景图移到第二张背景图的后面
        // 第一张背景图和第二张背景图交换位置
        if (firstXMax <= 0) {
            // 过一张图加一分
            this.GameComponent.addScore();
            // 第一张图出队列
            const preFirstBg = this.bgList.shift();
            // 消除背景图上障碍
            preFirstBg.destroyAllChildren();
            this.bgList.push(preFirstBg);
            const curFirstBg = this.bgList[0];
            // 重置位置
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
            this.initMap(preFirstBg);
        }
    }

    // 初始化地图
    initMap(bg: cc.Node) {
        let locationArray: locationArrayItem[] = [];
        // 获取背景的宽度
        const bgWidth = bg.width;
        // 创建一个不显示的石台实例，获取它的宽度
        const board = cc.instantiate(this.boardPrefab);
        const boardWidth = board.width;
        // 获取最多可以填充平台数量，数量不能超过这个值
        const index = Math.floor(bgWidth / boardWidth);
        // 随机一个地图块
        Object.keys(level).forEach(key => {
            const arr = this.initLocationArray(
                index - 1,
                0,
                level[key],
                boardWidth,
            );
            locationArray.push(...arr);
        });

        locationArray.forEach((item: locationArrayItem) => {
            if (item.type === 'board') {
                const board = cc.instantiate(this.boardPrefab);
                bg.addChild(board);
                board.setPosition(item.position);
            } else if (item.type === 'blank') {
                const board = cc.instantiate(this.blankPrefab);
                bg.addChild(board);
                board.setPosition(item.position);
            }
        });
    }

    // 随机生成石台
    initLocationArray(
        // 一层容纳的最大数量;
        index: number,
        // 初始化的x值;
        xBegin: number,
        // y的位置
        y: number,
        // 一个石台的位置
        boardWidth: number,
    ) {
        // 30%的几率生成空
        let perLocationArray = Array.apply(null, { length: index }).map(() =>
            // 80%概率生成平台
            Math.random() < 0.7 ? true : false,
        );
        const locationArray: locationArrayItem[] = [];

        perLocationArray[index] = true;
        perLocationArray = perLocationArray.map((item, idx) => {
            if (item === false && perLocationArray[idx + 1] === false) {
                return true;
            }
            return item;
        });
        // 根据初始化数组 初始化坐标
        perLocationArray.forEach((item, index) => {
            if (item === true) {
                const data = {
                    position: new cc.Vec2(xBegin + boardWidth * index, y),
                    type: 'board',
                };
                locationArray.push(data);
            } else {
                const data = {
                    position: new cc.Vec2(xBegin + boardWidth * index, y),
                    type: 'blank',
                };
                locationArray.push(data);
            }
        });
        return locationArray;
    }
}
