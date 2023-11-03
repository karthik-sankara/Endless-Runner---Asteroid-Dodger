//Karthik Sankara
//Endless Runner: Asteroid dodger
//Spent about 25 hours on this project. Working on this meticulously for about 4 days. 
/*
Technically Interesting: I used phaser's time.AddEvent method, to take advantage of its time & callback
feature so I could adjust the game's difficulty on the fly by dynamically updating the time difference between 
generating new asteroids while also actually generating multiple asteroids as well. I defined a function that 
initializes a group of asteroids that connects a collider between the player and the asteroids. I made that the 
callback function in my time.addEvent block of code so it continously generates. 
I based my ideas off of the phaser doc: https://newdocs.phaser.io/docs/3.55.2/Phaser.Time.TimerEvent
(I know its 3.55.2 but it worked in this game which uses phaser 3.6)
(In Play.js: Lines 97 - 118)
Also for technical style: I created the collision boundaries for both the player and asteroid in a way that
a very small threshold of edge collision may bounce the asteroid off the rocket. This can provide some 
sort of relief when the difficulty starts to increase. 
I didn't want to make the game like flappy bird where the collisions are super strict. 
I wanted to create a fun but challenging game, not a game that makes you frustrated.


Visual Style: I am proud of implementing my own pixel art for my rocket and asteroid. Additionally, I am also
really satisified based on the fact that I used duplicate, rotated images of my rocket pixel art to 
create my own texture atlas. It integrates some sort of realistic factor and player engagement 
when you see specific actions on the screen by your own input. I programmed specific movements to 
correlate with corresponding frames on the texture atlas. I thought this was pretty neat considering
I was pretty confused on how to even create my own assets when I first started this project. 
*/

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


let keyM, keyUP, keyR

//set ui sizes
let borderUISize = game.config.height / 15;    //creates dimensions for the game screen
let borderPadding = borderUISize / 3;

let cursors
let { height, width } = game.config


let elapsed_time


