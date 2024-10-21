export default class enemigo1 extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
      
    }

    newItem(){
        this.create(
                    Phaser.Math.Between(0, this.scene.scale.width), 80, 'enemigo1')
                    .setActive(true)
                    .setVisible(true)
                    .setGravityY(400)
                    .setCollideWorldBounds(true)
                    .setDepth(2)
                    .setCircle(40)
                    .setBounce(1.2, 1)
                    .setVelocityX((Phaser.Math.Between(0, 1) ? 0 : 0))
                    .hitsToKill = 1;
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}