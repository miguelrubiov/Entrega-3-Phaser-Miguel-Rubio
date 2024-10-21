export default class enemigo2 extends Phaser.Physics.Arcade.Group {
    constructor(physicsWorld, scene) {
        super(physicsWorld, scene);
       

      
    }

    newItem(){
        this.create(
                    Phaser.Math.Between(0, this.scene.scale.width), 20, 'enemigo2')
                    .setActive(true)
                    .setVisible(true)
                    .setGravityY(1)
                    .setCollideWorldBounds(true)
                    .setDepth(1)
                    .setCircle(45)
                    .setBounce(0, 0)
                    .setVelocityX((Phaser.Math.Between(0, 1) ? 0 : 0))
                    .hitsToKill = 1;
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
    // }

}