class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
        this.cursor_down = false
        this.velocityY = 300
        this.velocityX = 50
        this.time_diff = 500

    }


    preload() {
        this.load.audio('rocket_movement', './assets/rocket_movement.mp3')
        this.load.image('background', './assets/BigStars.png')
        this.load.spritesheet('spaceship', './assets/spritesheet.png', {
            frameWidth: 45,
            frameHeight: 45
        })
        this.load.image('asteroid','./assets/pixil-frame-0.png')
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 300, frameHeight: 300, startFrame: 0, endFrame: 0})
        this.load.audio('background_music', './assets/background_music.mp3')
        this.load.audio('explosion','./assets/explosion-129711.mp3')
    }


    create() {

        this.destroyed_rocket = false

        this.starfield = this.add.tileSprite(0, 0, 800, 800, 'background').setOrigin(0,0);

        elapsed_time = 0

        this.player = this.physics.add.sprite(400, 750, 'spaceship', 0).setScale(2)
        this.player.body.setCollideWorldBounds(true)

        this.player.body.setSize(this.player.height, this.player.width)
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
            asteroid.body.setCircle(35, asteroid.width / 11, asteroid.height / 11);

            this.asteroids.add(asteroid)
            asteroid.setVelocityY(this.velocityY)
            asteroid.setVelocityX(this.velocityX)
            this.physics.add.collider(this.player, this.asteroids) 
        }

        //use the time.addEvent's useful call back feature to call that initialize a certain number of asteroids in a given period (0.5 second)

        this.time.addEvent({
            delay: this.time_diff, // Spawn a new asteroid every 1000 milliseconds (1 second)
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
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

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

        

        this.scoreBottom = this.add.text(30,650, this.p1Score, this.scoreConfig)

        this.background_music = this.sound.add('background_music', {loop: true})

        this.explosion_music = this.sound.add('explosion')

        this.background_music.play()

    }

    update() {

        let score = this.p1Score

        this.starfield.tilePositionY -= 4

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'up';

        if(cursors.left.isDown) {
            if(!this.cursor_down) {
                this.sound.play('rocket_movement',{volume: 0.2})
                this.cursor_down = true
            }
            else {
                this.cursor_down = false
            }
            playerVector.x = -1
            playerDirection = 'left';
        }
        
        if(cursors.right.isDown) {
            if(!this.cursor_down) {
                this.sound.play('rocket_movement',{volume: 0.2})
                this.cursor_down = true
            }
            else {
                this.cursor_down = false
            }
            playerVector.x = 1
            playerDirection = 'right';
        }


        if(cursors.up.isDown) {
            if(!this.cursor_down) {
                this.sound.play('rocket_movement',{volume: 0.2})
                this.cursor_down = true
            }
            else {
                this.cursor_down = false
            }
            playerVector.y = -1
            playerDirection = 'up';

        }

        if(cursors.down.isDown) {
            if(!this.cursor_down) {
                this.sound.play('rocket_movement',{volume: 0.2})
                this.cursor_down = true
            }
            else {
                this.cursor_down = false
            }
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
            this.explosion_music.play()
            this.player.destroy()
            boom.anims.play('explode')
            this.add.text(game.config.width/2, 30, 'GAME OVER', this.menuConfig).setOrigin(0.5);
            this.add.text(350, 10, 'Score: ' + score, this.menuConfig)
            this.add.text(game.config.width/2, 60, 'Press (R) to Restart or (M) for Menu', this.menuConfig).setOrigin(0.5);
        }
        else {
            elapsed_time += 1;
            if(elapsed_time % 100 == 0) {
                this.p1Score += 5
                this.scoreBottom.text = this.p1Score; 
            }
            if(elapsed_time % 500 == 0) {
                this.time.addEvent.delay -= 100
                this.velocityY += 70
                this.velocityX += 10

            }
        }

        if(this.destroyed_rocket) {
            if(Phaser.Input.Keyboard.JustDown(keyR)) {
                this.background_music.stop()
                this.velocityY = 400
                this.velocityX = 100
                this.time_diff = 500
                this.scene.restart()
            }
            if(Phaser.Input.Keyboard.JustDown(keyM)) {
                this.background_music.stop()
                this.velocityY = 400
                this.velocityX = 100
                this.time_diff = 500
                this.scene.start("menuScene");
            }

        }


    }

}