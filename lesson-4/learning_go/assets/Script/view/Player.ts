const { ccclass, property } = cc._decorator;

import { BgMoveAction } from './BgMove';
import { level } from './BgMove';
import { GameAction } from '../controller/Game';

export type PlayerAction = {
    birth: () => void;
};

@ccclass
export default class Player extends cc.Component {
    GameComponent: GameAction;
    bgComponent: BgMoveAction;

    @property(cc.Node)
    game: cc.Node = null;

    // @property(cc.Boolean)
    // dead: boolean = false;

    // 跑步状态
    @property(cc.Boolean)
    running: boolean = false;

    // 跳跃相关
    @property(cc.Integer)
    jumpLevel: number = 0; // 允许二段跳 max 2

    // 跳跃状态
    @property(cc.Boolean)
    jumping: boolean = false;

    // 允许几段跳 max - 1
    @property(cc.Integer)
    jumpMax = 3;

    // 跳跃的初始化速度
    @property(cc.Integer)
    jumpSpeed: number = 0;

    // 定义地面
    @property()
    groundY: number = 0;

    // 速度
    @property(cc.Vec2)
    speed: cc.Vec2 = cc.v2(200, 0);

    // 最大速度
    @property(cc.Vec2)
    maxSpeed: cc.Vec2 = cc.v2(400, 2000);

    // 横向加速度
    @property()
    accel: number = 100;

    // 重力
    @property()
    gravity: number = -3000;

    @property(cc.Node)
    bg: cc.Node = null;

    // 碰撞相关
    @property(cc.Integer)
    collisionX: number = 0;

    @property(cc.Integer)
    collisionY: number = 0;

    // 销毁时
    onDestroy() {
        cc.systemEvent.off(
            cc.SystemEvent.EventType.KEY_DOWN,
            this.onKeyDown,
            this,
        );
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // 按下播放跑动动画
                this.getComponent(cc.Animation).play('player_run');
                this.running = true;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                // 拿起停止动画
                this.getComponent(cc.Animation).stop('player_run');
                this.running = false;
                this.speed.x = 200;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                if (this.jumpLevel < this.jumpMax - 1) {
                    this.jumping = true;
                    this.speed.y = this.jumpSpeed;
                    ++this.jumpLevel;
                }
                break;
        }
    }

    // 移动函数
    move = (dt: number) => {
        if (this.running && this.collisionX === 0) {
            // 正向移动判断
            if (this.speed.x < this.maxSpeed.x) {
                // 速度逐渐加快
                this.speed.x += this.accel * dt;
            }
            // 先跑到屏幕中间
            if (this.node.x < this.node.parent.width / 2) {
                this.node.x += this.speed.x * dt;
            } else {
                this.bgComponent.bgMove(this.speed.x * dt); // x移动是通过背景移动进行
            }
        }

        if (this.jumping && this.jumpLevel < this.jumpMax) {
            // 检测跳跃
            this.speed.y += this.gravity * dt;
            if (Math.abs(this.speed.y) > this.maxSpeed.y) {
                // 限制最大跳跃速度
                this.speed.y =
                    this.speed.y > 0 ? this.maxSpeed.y : -this.maxSpeed.y;
            }

            this.node.y += this.speed.y * dt;
        }
        // 平面检测
        if (this.node.y <= this.groundY) {
            this.node.y = this.groundY;
            this.jumpLevel = 0;
            this.jumping = false;
        }
    };

    init() {
        this.birth();
        this.GameComponent = this.game.getComponent('Game');
        this.groundY = this.node.y; // 设置地板位置
        this.bgComponent = this.bg.getComponent('BgMove'); // 获取背景
        // 碰撞检测
        this.collisionX = 0; //x轴是否碰撞，0：没有碰撞，-1：左方有碰撞，1：右方有碰撞
        this.collisionY = 0;
    }

    dead() {
        this.node.x = -999; // 移出屏幕
        this.getComponent(cc.Animation).stop('player_run');
        this.running = false;
        this.speed.x = 200;
        cc.systemEvent.off(
            cc.SystemEvent.EventType.KEY_DOWN,
            this.onKeyDown,
            this,
        );
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    public birth() {
        this.node.x = 200;
        this.node.y = 104;
        // 设置键盘监听
        cc.systemEvent.on(
            cc.SystemEvent.EventType.KEY_DOWN,
            this.onKeyDown,
            this,
        );

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    onCollisionEnter(other, self) {
        if (other.node.group === 'blank') {
            // 遇见空白时 直接返回 并且是跳跃状态
            if (!this.jumping) {
                this.jumping = true;
            }
            return;
        }

        if (other.node.group === 'stone') {
            // 遇见石头 结束游戏
            this.dead();
            this.GameComponent.overGame();
            return;
        }

        // 碰撞进入
        const otherAabb = other.world.aabb;
        const otherPreAabb = other.world.preAabb.clone(); // 上一帧碰撞框

        const selfAabb = self.world.aabb;
        const selfPreAabb = self.world.preAabb.clone();

        // 我们需要退回上一步的状态 先判断x的碰撞
        selfPreAabb.x = selfAabb.x;
        otherPreAabb.x = otherAabb.x;

        if (cc.Intersection.rectRect(selfPreAabb, otherPreAabb)) {
            // 检查x碰撞
            if (this.speed.x > 0) {
                this.node.x = otherPreAabb.xMin - selfPreAabb.width / 2 - 1;
            }
            this.collisionX = 1;
            other.touchingX = true;
            return;
        }

        selfPreAabb.y = selfAabb.y;
        otherPreAabb.y = otherAabb.y;

        if (cc.Intersection.rectRect(selfAabb, otherAabb)) {
            if (this.speed.y < 0 && selfPreAabb.yMax > otherPreAabb.yMax) {
                this.node.y = otherPreAabb.yMax;
                this.jumpLevel = 0;
                this.collisionY = -1;
                Object.keys(level).forEach(item => {
                    // 到达平台 不做掉落判断
                    if (level[item] + other.node.height / 2 === this.node.y) {
                        this.jumping = false;
                    }
                });
            } else if (
                this.speed.y > 0 &&
                selfPreAabb.yMin < otherPreAabb.yMin
            ) {
                this.node.y =
                    otherPreAabb.yMin -
                    selfPreAabb.height -
                    other.node.height / 2;
                this.collisionY = 1;
            }

            this.speed.y = 0;
            other.touchingY = true;
        }
    }

    onCollisionExit(other, self) {
        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        } else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    }

    onLoad() {
        this.init();
    }

    update(dt: number) {
        // 角色移动
        this.move(dt);
    }
}
