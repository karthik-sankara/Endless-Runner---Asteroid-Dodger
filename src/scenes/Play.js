class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('background', './assets/BigStars.png')
        this.load.spritesheet('spaceship', './assets/spritesheet.png', {
            frameWidth: 45,
            frameHeight: 45
        })
    }

    create() {
        this.starfield = this.add.tileSprite(0, 0, 800, 800, 'background').setOrigin(0,0);

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = this.physics.add.sprite(0, 650, 'spaceship', 0).setScale(2)
        this.player.body.setCollideWorldBounds(true)

        this.player.body.setSize(32, 32).setOffset(8, 16)
        this.PLAYER_VELOCITY = 350

        cursors = this.input.keyboard.createCursorKeys()

        this.anims.create({
            key: 'idle-up', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 0
            })
        })

        this.anims.create({                     //created these animations so i wouldn't have missing animation error in the chrome console
            key: 'fly-up', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 0
            })
        })

        this.anims.create({
            key: 'fly-down', 
            frameRate: 0,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 0,
                end: 0
            })
        })


        this.anims.create({
            key: 'fly-left', 
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 2,
                end: 2
            })
        })

        this.anims.create({
            key: 'fly-right', 
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('spaceship', {
                start: 1,
                end: 1
            })
        })




    }

    update() {
        this.starfield.tilePositionY -= 4

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'up';



        if(cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left';
            //playerRotation = -10;
        }
        
        if(cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right';
            //playerRotation = 10;
        }


        if(cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up';

        }

        if(cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down';
        }




        playerVector.normalize()

        
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'fly' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)

    }




}