cc.Class({
    extends: cc.Component,

    properties: {
        speedMax: 0,
        speedMin: 0,
        getWeaponSound: {
            default: null,
            type: cc.AudioClip,
        }
    },

    // use this for initialization
    onLoad () {
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
    },

    onCollisionEnter (other, self) {
        cc.audioEngine.playEffect(this.getWeaponSound);
        this.weaponGroup.destroyWeapon(this.node);
    },

    // called every frame, uncomment this function to activate update callback
    update (dt) {
        if (this.weaponGroup.paused) return;

        this.node.y -= dt * this.speed;
        if (this.node.y < - (this.node.parent.height + this.node.height) / 2) {
            this.weaponGroup.destroyWeapon(this.node);
        }
    },
});
