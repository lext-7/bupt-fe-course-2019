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

// 每一层平台的 y 值
const level = {
    1: 200,
    2: 350,
    3: 500,
};

@ccclass
export default class BgMove extends cc.Component {
    // 预设地图资源
    @property(cc.Prefab)
    boardPrefab: cc.Prefab;

    // 作为两张背景图存储数组
    bgList: cc.Node[] = [];

    // 地图速度
    @property(cc.Integer)
    speed: number = 3;

    onLoad() {
        // 初始化背景位置
        this.bgList = [this.node.children[0], this.node.children[1]];
        this.bgList[1].setPosition(this.node.width, 0);
        this.initMap(this.bgList[0]);
        this.initMap(this.bgList[1]);
    }

    update() {
        this.bgMove(this.bgList, this.speed);
        this.checkBgReset(this.bgList);
    }

    // 背景两张图片移动
    bgMove(bgList: cc.Node[], speed: number) {
        bgList.forEach(bg => {
            bg.x -= speed;
        });
    }

    // 检查第一张图是否超出容器，若超出，将第一张图放到第二张图后
    checkBgReset(bgList: cc.Node[]) {
        // 获取第一张背景图的最右位置
        const firstXMax = bgList[0].getBoundingBox().xMax;
        // 如果第一张背景图完全移动到屏幕之外，将第一张背景图移到第二张背景图的后面
        // 第一张背景图和第二张背景图交换位置
        if (firstXMax <= 0) {
            // 第一张图出队列
            const preFirstBg = bgList.shift();
            // 消除背景图上障碍
            preFirstBg.destroyAllChildren();
            bgList.push(preFirstBg);
            const curFirstBg = bgList[0];
            // 重置位置
            preFirstBg.x = curFirstBg.getBoundingBox().xMax;
            this.initMap(preFirstBg);
        }
    }

    // 初始化地图
    initMap(bg: cc.Node) {
        let locationArray: cc.Vec2[] = [];
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

        locationArray.forEach((item: cc.Vec2) => {
            const board = cc.instantiate(this.boardPrefab);
            bg.addChild(board);
            board.setPosition(item);
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
            Math.random() < 0.8 ? true : false,
		);
        const locationArray: cc.Vec2[] = [];
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
                locationArray.push(new cc.Vec2(xBegin + boardWidth * index, y));
            }
        });
        return locationArray;
    }
}
