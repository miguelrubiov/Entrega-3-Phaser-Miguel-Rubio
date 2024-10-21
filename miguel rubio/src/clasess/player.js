export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite); 
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);

        this.init();
        this.animatePlayer();
    
    }

    // preUpdate (time, delta)
    // {
    //     super.preUpdate(time, delta);
   
    // }

    init(){
        this
        .setBounce(0.2)
        .setCollideWorldBounds(true)
        //.setGravityY(300)
        .setDepth(4)
        .body.setSize(35,66,35,30); // custom mask => setSize(width, height, XinSprite, YinSprite)
    }

    animatePlayer() {


    }
}