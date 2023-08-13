const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const foodColor = "red";
const snakeBorder = "black";
const unitSize = 25;
let running = false; // To check if game is currently running or not
let xVelocity = unitSize;  // Check how for we moved on x axis on every single game tick. If xVelocity is positive, we move right and if xVelocity is Negative, we move to the left.
let yVelocity = 0;  // Check how for we moved on y axis on every single game tick. If yVelocity is equal "unitSize", we move down and if yVelocity is equal "-unitSize", we move up. If yVelocity is equal "0", we not moving.
let foodX;
let foodY;
let score = 0;
let snake = [  // The whole snake as it is a set of objects i.e. each block in snake body is one object
    {x:unitSize * 1, y:0},
    {x:2, y:0},
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 90);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
function drawFood() {
    const appleImg = new Image();
    appleImg.src = 'apple.png';
    ctx.drawImage(appleImg, foodX, foodY, unitSize, unitSize);
}
function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    
    snake.unshift(head);
    //if food is eaten
    if(snake[0].x == foodX && snake[0].y == foodY){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }

};
function changeDirection(event){  // invoke this function each time the key is pressed
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingLEFT = (xVelocity == -unitSize);
    const goingUP = (yVelocity == -unitSize);
    const goingRIGHT = (xVelocity == unitSize);
    const goingDOWN = (yVelocity == unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRIGHT):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDOWN):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        case(keyPressed == RIGHT && !goingLEFT):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUP):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
    }
};
function checkGameOver(){
    switch(true){
        case (snake[0].x < 0):  // We went over the left border
            running = false;
            break;
        case (snake[0].x >= gameWidth):  // We went over the right border
            running = false;
            break;
        case (snake[0].y < 0):  // We went over the up border
            running = false;
            break;
        case (snake[0].y >= gameHeight):  // We went over the down border
            running = false;
            break;
    }
    for(let i = 1; i < snake.length; i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayGameOver(){
    ctx.font = "50px Coiny";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", gameWidth / 2, gameHeight / 2);
    running = false
};
function resetGame(){
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [  // The whole snake as it is a set of objects i.e. each block in snake body is one object
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize * 1, y:0},
        {x:2, y:0},
    ];
    gameStart();
};