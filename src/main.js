// IMPORTAR LA PRIMERA ESCENA
import Firstscene from './scenes/Firstscene.js'
import Intro from './scenes/Intro.js'
import GameOverScene from './scenes/GameOverScene.js'
import Secondscene from './scenes/Secondscene.js'
import Thirdscene from './scenes/Thirdscene.js'
import Fourthscene from './scenes/Fourthscene.js'



const config = {

    // OPCIONALES
    title: 'Guerra Mundial Ñ',
    url: 'http://enmilocalfunciona.io',
    version: '0.0.1',

    // OPCIONAL
    pixelArt: true, // REMARCAR LOS PIXELES DE LAS IMAGENES

    // OBLIGATORIO
    type: Phaser.AUTO, // WEBGL O CANVAS O AUTOMATICO
    backgroundColor: '#34495E', // FONDO DEL LIENZO
    scale: {
        width: 750, // TAMAÑO DEL LIENZO
        height: 400,
        parent: 'container', // ID DEL CONTENEDOR
        mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },

    // INFORMACIÓN DE LA CONSOLA
    banner: {
        hidePhaser: true, // OCULTAR TEXTO DE PHASER EN CONSOLA
        text: '#000000', // CAMBIAR COLOR DEL TEXTO DEL TITULO DEL JUEGO EN CONSOLA
         // PALETA DE COLORES DE ADORNO EN CONSOLA
        background: [
            'red',
            'yellow',
            'red',
            'transparent'
        ]
       
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 15 },
            debug: false
        }
    },

    //ESCENAS DEL JUEGO
    scene: [
        Intro,
        Firstscene,
        Secondscene,
        Thirdscene,
        Fourthscene,
        GameOverScene
    ]
};
// CREAR LA INSTANCIA DEL JUEGO
const game = new Phaser.Game(config);


