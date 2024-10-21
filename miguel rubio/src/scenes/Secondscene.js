import enemigo1 from "../clasess/enemigo1.js";
import Player from "../clasess/player.js";
import enemigo2 from "../clasess/enemigo2.js";

class Secondscene extends Phaser.Scene {
    constructor() {
        super('Secondscene');
        this.bulletGroupA = null;  // Grupo para el personaje que usa WASD
        this.bulletGroupB = null;  // Grupo para el personaje que usa flechas
    }

    init() {
        console.log("Secondscene");
        this.respawn = 0;
        this.respawnInterval = 1800;
        this.scoreText = "";
        this.score = 0;
        this.lifesCounter = 3;
        this.lifesText = "";
        this.newLife = 250; // Nueva Vida cada X puntuación
        this.enemiesGlobalCounter = 0;
        this.invincible = false;
        this.ammo = 60;
        this.ammoText = "";
    }

    preload() {
        this.load.path = './assets/';
        
        // LOAD IMAGES AND SPRITES
        this.load.image('background_nivel', 'backgrounds/fondo_nivel.png')
            .image("bullet", "sprites/bullet.png")         // Bala del jugador 1
            .image("bullet_verde", "sprites/bullet_verde.png") // Bala del jugador 2 (verde)
            .image("enemigo2", "sprites/enemigo_naranja.png")
            .image("enemigo1", "sprites/enemigo1.1.png")
            .image('life', "sprites/caja.png")
            .image('caja', 'sprites/caja.png')
            .image('reload', 'sprites/reload.png')
            .spritesheet('playersprite_naranja', 'sprites/player_sprite_naranja.png', { frameWidth: 50, frameHeight: 66 })
            .spritesheet('playersprite', 'sprites/playersprite.png', { frameWidth: 50, frameHeight: 66 })
            .spritesheet('playersprite_azul', 'sprites/player_sprite_azul.png', { frameWidth: 50, frameHeight: 66 })
            .image('barrera', 'sprites/barrera.png');  // Imagen de la barrera

        // LOAD AUDIOS
        this.load.audio('pop', ['sounds/pop.wav'])
            .audio('shot', ['sounds/shot.wav'])
            .audio('killed', ['sounds/killed.wav'])
            .audio('rebound', ['sounds/rebound.wav'])
            .audio('bgmusic', ['sounds/bgmusic.wav']);
    }

    create() {
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // PLAYER
        this.player = new Player(this, this.sys.game.canvas.width / 2, this.sys.game.canvas.height, 'playersprite_naranja');
        this.player_verde = new Player(this, this.sys.game.canvas.width / 2 + 100, this.sys.game.canvas.height, 'playersprite_azul');

        // BARRERA
        /*
        
        this.barrera = this.physics.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height - 20, 'barrera');
        this.barrera.setDepth(1);
        this.barrera.setDisplaySize(this.sys.game.canvas.width, 20); // Ajusta la altura si es necesario
        this.barrera.body.setSize(this.sys.game.canvas.width, 20); // 20 es la altura que puedes ajustar
        this.barrera.setOrigin(0.5, 1); // Mueve el origen un poco más alto
        this.barrera.body.allowGravity = false;

        */

        this.barrera = new Player(this, this.sys.game.canvas.width /2, this.sys.game.canvas.height - 20, 'barrera');
        this.barrera.setDepth(1);
        const playerHeight = this.player.height; // Asumiendo que 'this.player' es el personaje
        this.barrera.setDisplaySize(this.sys.game.canvas.width, playerHeight / 2 );
        this.barrera.body.setSize(this.sys.game.canvas.width, playerHeight / 2 ); // 20 es la altura que puedes ajustar
        this.barrera.setOrigin(0.5, 1); // Mueve el origen un poco más alto
        this.barrera.body.allowGravity = false;

        // TEXTS
        this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'SCORE: ' + this.score, { fontStyle: 'strong', font: '19px Arial', fill: '#6368BC' });
        this.scoreText.setDepth(1);
        this.lifesText = this.add.text(50, 10, 'X ' + this.lifesCounter, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.lifesText.setDepth(1);
        this.ammoText = this.add.text(this.sys.game.canvas.width - 150, 10, 'AMMO: ' + this.ammo, { fontStyle: 'strong', align: 'right', font: '24px Arial', fill: 'beige' });
        this.ammoText.setDepth(1);

        // CREATE AUDIOS
        this.popSound = this.sound.add('pop');
        this.shotSound = this.sound.add('shot');
        this.killedSound = this.sound.add('killed');
        this.reboundSound = this.sound.add('rebound');

        // background_nivel MUSIC
        this.backgroundMusic = this.sound.add('bgmusic');
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();

        // CREATE KEYBOARD CURSOS
        this.cursors = this.input.keyboard.createCursorKeys();

        // CREATE SPRITES
        this.background = this.add.image(this.sys.game.canvas.width / 2, this.sys.game.canvas.height / 2, 'background_nivel').setDisplaySize(this.sys.game.canvas.width, this.sys.game.canvas.height);
        this.lifeSprite = this.add.image(30, 18, 'life').setDepth(1);
        this.cajaImage = this.physics.add.image(40, this.sys.game.canvas.height - 30, 'caja')
            .setActive(true)
            .setDepth(1)
            .setVisible(false);
        this.lifeSprite.setDisplaySize(30, 30);

        // Configura las propiedades físicas de la imagen de la caja
        this.cajaImage.body.allowGravity = false; // Evita que la caja caiga por la gravedad
        this.cajaImage.body.immovable = true;

        this.reloadImage = this.add.image(50, this.sys.game.canvas.height - 80, 'reload');
        this.reloadImage.setVisible(false);

        // GROUPS
        this.enemigo2Group = new enemigo2(this.physics.world, this);
        this.enemigo1Group = new enemigo1(this.physics.world, this);
        this.bulletGroupA = this.physics.add.group(); // Grupo para el personaje verde (WASD)
        this.bulletGroupB = this.physics.add.group(); // Grupo para el personaje flechas

        // ADD COLLIDERS BETWEEN SPRITES        
        this.physics.add.overlap(this.player, [this.enemigo2Group, this.enemigo1Group], this.hitPlayer, null, this);
        this.physics.add.overlap(this.player_verde, [this.enemigo2Group, this.enemigo1Group], this.hitPlayer, null, this);
        this.physics.add.overlap(this.barrera, [this.enemigo2Group, this.enemigo1Group], this.hitBarrera, null, this);
        this.physics.add.collider(this.bulletGroupA, this.enemigo2Group, this.hitEnemies, null, this); // Balas del jugador 1 afectan enemigo2
        this.physics.add.collider(this.bulletGroupB, this.enemigo1Group, this.hitEnemies, null, this); // Balas del jugador 2 afectan enemigo1
        this.physics.add.overlap(this.player, this.cajaImage, this.reloadAmmo, null, this);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('playersprite', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'playersprite', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('playersprite', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });  

        // AZUL
        this.anims.create({
            key: 'left_a',
            frames: this.anims.generateFrameNumbers('playersprite_azul', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_a',
            frames: [{ key: 'playersprite_azul', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right_a',
            frames: this.anims.generateFrameNumbers('playersprite_azul', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });  

        // NARANJA
        this.anims.create({
            key: 'left_n',
            frames: this.anims.generateFrameNumbers('playersprite_naranja', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn_n',
            frames: [{ key: 'playersprite_naranja', frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right_n',
            frames: this.anims.generateFrameNumbers('playersprite_naranja', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });  
    }

    update(time, delta) {
        //  ENEMIES RESPAWN CONTROL AFTER GAME OVER
        if (time > this.respawnInterval && this.respawn == 0) {
            this.respawn = Math.trunc(time);
        }

        if (time > this.respawn) {
            if (this.enemiesGlobalCounter % 5 == 0 && this.enemiesGlobalCounter != 0) {
                if (this.respawnInterval > 500) {
                    this.respawnInterval -= 100;
                }
                this.addEnemy(0);
            } else {
                this.addEnemy(1);
            }
            this.respawn += this.respawnInterval;
        }

        // Movimiento del jugador naranja con las flechas del teclado
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-400).anims.play('left_n', true);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(400).anims.play('right_n', true);
        } else {
            this.player.setVelocityX(0).anims.play('turn_n');
        }

        if (this.input.keyboard.checkDown(this.cursors.up, 250)) {
            this.player.setVelocity(0, 0).anims.play('turn_n');
            this.fire(this.player, this.bulletGroupB); // Dispara desde el grupo B
        }

        // Movimiento del player_azul con WASD
        if (this.wasd.left.isDown) {
            this.player_verde.setVelocityX(-400).anims.play('left_a', true);
        } else if (this.wasd.right.isDown) {
            this.player_verde.setVelocityX(400).anims.play('right_a', true);
        } else {
            this.player_verde.setVelocityX(0).anims.play('turn_a');
        }

        if (this.input.keyboard.checkDown(this.wasd.up, 250)) {
            this.player_verde.setVelocity(0, 0).anims.play('turn_a');
            this.fire(this.player_verde, this.bulletGroupA); // Dispara desde el grupo A
        }
        
    }
    

    addEnemy() {
        const rand = Math.random(); 
        
        let type;
        if (rand < 0.5) {
            type = 0; 
        } else {
            type = 1; 
        }

        if (type === 0) {
            const enemy = this.enemigo2Group.create(Phaser.Math.Between(0, this.sys.game.canvas.width), 0, 'enemigo2');
            enemy.setVelocityY(50);
            enemy.hitsToKill = 2; 
        } else {
            const enemy = this.enemigo1Group.create(Phaser.Math.Between(0, this.sys.game.canvas.width), 0, 'enemigo1');
            enemy.setVelocityY(50);
            enemy.hitsToKill = 2;
        }
        
        this.enemiesGlobalCounter++;
    }

    hitPlayer(player, enemy) {
        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            enemy.destroy();
            player.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invincible = false;
                    player.clearTint();
                }
            });

            if (this.lifesCounter < 0) {
                this.enemigo2Group.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.enemigo1Group.clear(true, true);
                this.bulletGroupA.clear(true, true);
                this.bulletGroupB.clear(true, true);
                this.scene.start('GameOverScene');
            }
        }
    }


    hitBarrera(barrera, enemy) {
        if (!this.invincible) {
            this.invincible = true;
            this.killedSound.play();
            this.lifesCounter--;
            this.lifesText.setText('X ' + this.lifesCounter);
            enemy.destroy();
            barrera.setTint(0x1abc9c);
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.invincible = false;
                    barrera.clearTint();
                }
            });

            if (this.lifesCounter < 0) {
                this.enemigo2Group.clear(true, true); // clear( [removeFromScene] [, destroyChild])
                this.enemigo1Group.clear(true, true);
                this.bulletGroupA.clear(true, true);
                this.bulletGroupB.clear(true, true);
                this.scene.start('GameOverScene');
            }
        }
    }

    hitEnemies(bullet, enemy) {
        // Lógica para manejar el impacto de la bala en el enemigo
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();
        enemy.hitsToKill--;
        enemy.setVelocityY(50);

        if (enemy.hitsToKill <= 0) {
            enemy.destroy();
            this.popSound.play();
            this.score += 10;
            this.scoreText.setText('SCORE: ' + this.score);

            if (this.score % this.newLife === 0) {
                this.lifesCounter++;
                this.lifesText.setText('X ' + this.lifesCounter);
            }
        }
    }

    fire(player, bulletGroup) {
        if (this.ammo >= 1) {
            const bullet = bulletGroup.create(player.x, player.y, player === this.player ?  'bullet_verde' : 'bullet' ); // Cambia la bala según el jugador
            bullet.setVelocityY(-400); // Ajusta la dirección y velocidad
            bullet.lifespan = 20; // Duración de la bala
            this.shotSound.play();
            this.ammo--;
            this.ammoText.setText('AMMO: ' + this.ammo);
            bullet.setDisplaySize(50, 50);
        }

        if (this.ammo === 0) {
            this.reloadImage.setVisible(true).setActive(true);
            this.cajaImage.setVisible(true).setActive(true);
        }
    }

    reloadAmmo(player, caja) {
        // Lógica para recargar munición al tocar la caja
        this.ammo += 10; // Recarga 10 balas
        this.ammoText.setText('AMMO: ' + this.ammo);
        caja.setVisible(false); // Ocultar la caja después de recoger
    }

    addEnemy() {
        const rand = Math.random(); // Genera un número aleatorio entre 0 y 1
        const playerHeight = this.player.height; // Asumiendo que 'this.player' es el personaje
        const playerWidth = this.player.height;
    
        // Define el tipo de enemigo basado en el número aleatorio
        let type;
        if (rand < 0.5) { // 50% de probabilidad para cada tipo
            type = 0; // Genera enemigo tipo 1
        } else {
            type = 1; // Genera enemigo tipo 2
        }

    
        // Generación del enemigo
        if (type === 0) {
            const enemy = this.enemigo2Group.create(Phaser.Math.Between(0, this.sys.game.canvas.width), 0, 'enemigo2');
            enemy.setVelocityY(60);
            enemy.setDisplaySize(playerWidth, playerHeight);
            enemy.hitsToKill = 2; // Define cuántos golpes necesita el enemigo para ser destruido
        } else if (type === 1) {
            const enemy = this.enemigo1Group.create(Phaser.Math.Between(0, this.sys.game.canvas.width), 0, 'enemigo1');
            enemy.setVelocityY(60);
            enemy.setDisplaySize(playerWidth, playerHeight);
            enemy.hitsToKill = 2;
        }
    
        this.enemiesGlobalCounter++;
    }
}

export default Secondscene;
