//Karthik Sankara
//Endless Runner: Asteroid dodger

let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 800,
    width: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config)
//global vars


let keyLEFT, keyUP, keyR

//set ui sizes
let borderUISize = game.config.height / 15;    //creates dimensions for the game screen
let borderPadding = borderUISize / 3;

let cursors
let { height, width } = game.config




