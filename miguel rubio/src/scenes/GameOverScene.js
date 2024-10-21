class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(){

    }

    preload(){
        this.load.path = './assets/';
        this.load.image('background_gameover', 'backgrounds/gameover.png')
    }

    create() {
        // Cambia el color de fondo a rojo
        this.cameras.main.setBackgroundColor('#ff0000'); 

        // Añade un texto de Game Over
        this.add.text(100, 100, 'Game Over', { font: '48px Arial', fill: '#ffffff' });

        // Añade un mensaje para reiniciar
        this.add.text(100, 200, 'Press SPACE to Restart', { font: '24px Arial', fill: '#ffffff' });
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background_gameover').setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);
        
        // Detecta cuando se pulsa la tecla espacio
        this.input.keyboard.on('keydown-SPACE', () => {
            this.scene.start('Intro'); // Vuelve a la escena Intro
        });
    }
}

export default GameOverScene;
