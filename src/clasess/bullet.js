export default class Bullet extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);

        this.scene = scene;
    }

    newItem(x = 17, y = 30) {
        var item = this.create(this.scene.player.x + x, this.scene.player.y - y, 'bullet')
            .setScale(0.5)
            .setActive(true)
            .setVisible(true)
            .setGravityY(-350)
            .setDepth(2);
        item.body.velocity.y = -350;
        item.body.setSize(item.width * 0.5, item.height * 0.5);
        item.outOfBoundsKill = true;
    }

    newDoubleItem() {

        this.newItem(30,30);
        this.newItem(7,30);

    }
    
    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}