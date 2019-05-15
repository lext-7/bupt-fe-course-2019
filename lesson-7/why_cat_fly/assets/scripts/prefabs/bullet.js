cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.Integer,
        angle: cc.Float,
    },

    // use this for initialization
    onLoad () {

    },

    onCollisionEnter (other, self) {
        const hp = other.node.getComponent('candy').candyHp;
        if (hp > 0) {
            this.bulletGroup.destroyBullet(self.node);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update (dt) {
        if (this.bulletGroup.paused) return;

        const radian = Math.PI / (180 / this.angle);
        const move = cc.v2(Math.cos(radian), Math.sin(radian)).mulSelf(dt * this.speed);
        this.node.position = this.node.position.add(move);
        // this.node.y += dt * this.speed;
        if (this.node.y > this.node.parent.height / 2
          || this.node.x < - this.node.parent.width / 2
          || this.node.x > this.node.parent.width / 2
        ) {
            this.bulletGroup.destroyBullet(this.node);
        }
    },
});
