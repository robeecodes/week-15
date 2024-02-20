const SPRITE_PATHS = ['assets/img/sprite.png', 'assets/img/demon.png'];

let x, y;
let radius = 100;
let timer = 10;
let fps = 60;
let interval = fps;
let score = 0;
let gameOver = false;
let gameOverCount = 0;
let sprite;
let spritePath;

function setup() {
    createCanvas(windowWidth, windowHeight);
    updateValues();
}

function draw() {
    background(220);

    if (!gameOver) {
        if (frameCount % fps === 0) {
            timer--;
        }

        // when frameCount is divisible by the interval, then the interval (in seconds) has passed
        if (frameCount % interval === 0) {
            updateValues();
        }

        drawSprite();

        textSize(24);
        textAlign(LEFT, CENTER);
        text("Score: " + score, 10, 30);
        text("Countdown: " + timer, 120, 30);

        if (timer <= 0) {
            gameOver = true;
            gameOverCount++;
        }
    }

    if (gameOver) {
        textSize(48);
        textAlign(CENTER, CENTER);
        text("GAME OVER!!!!!", windowWidth / 2, windowHeight / 2);
        text("Restart?", windowWidth / 2, windowHeight / 2 + 150);
    }
}

function mousePressed() {
    if (!gameOver) {
        if (mouseX > x && mouseX < x + sprite.width && mouseY > y && mouseY < y + sprite.height) {
            if (spritePath === SPRITE_PATHS[0]) {
                score++;
            } else {
                score--;
            }
            updateValues();
            interval = Math.max(interval - 5, 0);
        }
    } else {
        if (checkMouseInText("Restart?", windowWidth / 2, windowHeight / 2 + 150)) {
            gameOver = false;
            score = 0;
            timer = 10;
            interval = Math.max(fps - (gameOverCount * 3), 0);
        }
    }
}

function updateValues() {
    spritePath = random(SPRITE_PATHS);
    sprite = loadImage(spritePath);

    x = random(windowWidth - sprite.width);
    y = random(windowHeight - sprite.height);
}

function drawSprite() {
    image(sprite, x, y);
}

function checkMouseInText(msg, msgX, msgY) {

    // Calculate text bounds
    let msgWidth = textWidth(msg);
    let msgTop = msgY - textAscent();
    let msgBottom = msgY + textDescent();

    return (
        mouseX > (msgX - msgWidth / 2) &&
        mouseX < (msgX + msgWidth / 2) &&
        mouseY > msgTop &&
        mouseY < msgBottom
    );
}