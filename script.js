let playerState = 'idle';//starting animation state on page load
const dropdown = document.getElementById('animations');//DOM query to impleent the dropdown with animation types
dropdown.addEventListener('change', function(e){
    playerState = e.target.value
})

const canvas = document.getElementById('canvas1'); //query for html canvas element
const ctx = canvas.getContext('2d');//initiatilizing a variable for 2D rendering
const CANVAS_WIDTH = canvas.width = 600;//widht of canvas
const CANVAS_HEIGHT = canvas.height = 600;//height of canvas

const playerImage = new Image();//intializing a variable for image
playerImage.src = 'images/shadow_dog.png'//setting the image source
const spriteWidth = 575;//setting the width of the image/sprite
const spriteHeight = 523;//setting the width of the image/sprite

let gameFrame = 0;//variable initialized to set speed of the animation
const staggerFrames = 5;//need to rewatch the course to understand what this is doing again
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    },
];//all of the animation states and the amount of frames for each

animationStates.forEach((state, index) => {//need a refresher on what this forEach is doing exactly
    let frames = {
        loc: [],
    }
    for (let i=0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations [state.name] = frames;
})

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);//clears the canvas
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; //this was a "magic" line of code that he said to not worry about understanding it exacttly, but I need to revisit to understand best I can
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
  

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();

// class one complete!