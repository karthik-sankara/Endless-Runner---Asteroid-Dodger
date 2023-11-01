class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.destroyed_rocket = false
    }


    preload() {
        this.load.image('background', './assets/BigStars.png')
        this.load.spritesheet('spaceship', './assets/spritesheet.png', {
            frameWidth: 45,
            frameHeight: 45
        })
        this.load.image('asteroid','./assets/pixil-frame-0.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 0})

    }


    create() {

        this.destroyed_rocket = false

        this.starfield = this.add.tileSprite(0, 0, 800, 800, 'background').setOrigin(0,0);

        elapsed_time = 0

        
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.player = this.physics.add.sprite(400, 750, 'spaceship', 0).setScale(2)
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

        this.anims.create({                     //created these extra animations so i wouldn't have missing animation error in the chrome console
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

        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        //Inspiration from https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.TimerEvent 
        //On how this is used to keep repeating functions, using the callBack feature
        //I just created a function that creates and initializes asteroid object and adds it to a group (collection of asteroids which are dependant on physics)

        this.asteroids = this.physics.add.group()


        function initAsteroid() {
            const asteroid = this.physics.add.sprite(Phaser.Math.Between(0, this.game.config.width), 0, 'asteroid')
            asteroid.body.setCircle(38, asteroid.width / 6);

            this.asteroids.add(asteroid)
            asteroid.setVelocityY(400)
            this.physics.add.collider(this.player, this.asteroids) 
        }

        //use the time.addEvent's useful call back feature to call that initialize a certain number of asteroids in a given period (0.5 second)

        this.time.addEvent({
            delay: 500, // Spawn a new asteroid every 1000 milliseconds (1 second)
            callback: initAsteroid,
            callbackScope: this,
            loop: true // For the endless runner theme !
        });
        //////////////////////////////////////////////////////////////////////////////////////////////////////

        this.anims.create ({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 0, first: 0}),
            frameRate: 30
        })

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

        this.p1Score = 0


        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'middle',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 600
        }

        

        this.scoreBottom = this.add.text(30,650, this.p1Score, this.scoreConfig);

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

        if(!this.destroyed_rocket) {
            this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)
            let playerMovement
            playerVector.length() ? playerMovement = 'fly' : playerMovement = 'idle'
            this.player.play(playerMovement + '-' + playerDirection, true)
        }


        if((this.physics.overlap(this.player, this.asteroids)) && !this.destroyed_rocket) {
            this.destroyed_rocket = true
            let boom = this.add.sprite(this.player.x, this.player.y, 'explosion')
            this.player.destroy()
            boom.anims.play('explode')
            this.add.text(game.config.width/2, 30, 'GAME OVER', this.menuConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, 60, 'Press (R) to Restart or ← for Menu', this.menuConfig).setOrigin(0.5);
        }
        else {
            elapsed_time += 1;
            if(elapsed_time % 100 == 0) {
                this.p1Score += 5
                this.scoreBottom.text = this.p1Score; 
            }
        }

        if(this.destroyed_rocket) {
            if(Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.restart()
            }
            if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
            }

        }


    }

}