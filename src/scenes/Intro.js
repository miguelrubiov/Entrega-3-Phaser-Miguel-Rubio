
class Intro extends Phaser.Scene {

    constructor() {
        super('Intro');
    }

    init() {
        console.log("Intro");  

    }

    preload() {
        this.load.path = './assets/';
        this.load.image('background', 'backgrounds/background.png')
  
    }

    create() {
        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        //this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background');
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background').setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);
        
        this.keyOne = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.keyTwo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.keyThree = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        this.keyFour = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR);
    }

    update(time, delta) {

        // INPUT CONTROL
        if (this.input.keyboard.checkDown(this.keyOne, 250)) {
            this.scene.start('Firstscene');
        }

        if (this.input.keyboard.checkDown(this.keyTwo, 250)) {
            this.scene.start('Secondscene');
        }

        if (this.input.keyboard.checkDown(this.keyThree, 250)) {
            this.scene.start('Thirdscene');
        }

        if (this.input.keyboard.checkDown(this.keyFour, 250)) {
            this.scene.start('Fourthscene');
        }
    }
}

export default Intro;


