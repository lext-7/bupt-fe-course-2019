cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },

    update (dt) {
        if (this.cloudGroup.paused) return;

        this.node.y -= dt * this.speed;
        if (this.node.y < - (this.node.parent.height / 2 + this.node.height)) {
            this.cloudGroup.destroyCloud(this.node);
        }
    },
});
