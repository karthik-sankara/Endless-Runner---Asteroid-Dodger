class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //preload audio from assets
        this.load.audio('rocket_movement_left', './assets/fast-whoosh-118248.mp3')
        this.load.audio('rocket_impact', './assets/impact-6291.mp3')
        this.load.audio('transition', './assets/transition-base-121422.mp3')
    }

    create() {
        let menuConfig = {
            fontFamily: 'Roboto Serif',
            fontSize: '28px',
            backgroundColor: 'Purple',
            color: 'Black',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }



        this.add.text(game.config.width/2, game.config.height/2- borderUISize - borderPadding, 'Attack of the Asteroids', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- ^ -> arrows to move up and side to dodge the asteroids', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ^ to begin!', menuConfig).setOrigin(0.5);

        






        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        
    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.sound.play('transition');
            this.scene.start("playScene");    
        }





    }

}