class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //preload audio from assets
        this.load.audio('transition', './assets/menuselect4-36147.mp3')
        
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



        this.add.text(400, 100, 'Attack of the Asteroids', menuConfig).setOrigin(0.5);
        this.add.text(400, 250, 'Use ↕️↔️ arrow keys to move up, down, l, and r to dodge the asteroids', menuConfig).setOrigin(0.5);
        this.add.text(400, 300, 'Edge collisions can redirect Asteroids!', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(400, 400, 'Press ⬆️ to begin!', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = 'Orange';
        menuConfig.color = 'black';
        this.add.text(400, 650, 'Made by Karthik Sankara', menuConfig).setOrigin(0.5);
        this.add.text(400, 700, 'Art created by using: pixilart.com & leshylabs.com', menuConfig).setOrigin(0.5);
        this.add.text(400, 750, 'Royalty Free music from: pixabay.com', menuConfig).setOrigin(0.5);









        
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

        
    }


    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.sound.play('transition', {volume: 5});  
            this.scene.start("playScene");  
        }





    }

}