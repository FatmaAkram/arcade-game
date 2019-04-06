"use strict";
//Global Variables 
var score = 0,
    lives = 3,
    scoreContainer = document.querySelector("#score"),
    livesContainer = document.querySelector("#lives");

// Enemies our player must avoid
var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    this.x = x;
    this.y = y;
    // Get a random speed.
    this.speed = Math.floor(Math.random() * 5 + 1);
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500) {
        this.x += 100 * this.speed * dt;
    } else {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


function Player(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-pink-girl.png';
}

Player.prototype.handleInput = function (keyCode) {
    this.keyCode = keyCode;
    // Movement keys 
    switch (keyCode) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;

        case 'up':
            if (this.y > 0) {
                this.y -= 86;
            }

            break;

        case 'right':
            if (this.x < 390) {

                this.x += 100;
            }
            break;

        case 'down':
            if (this.y < 390) {
                this.y += 86;
            }
            break;
    }
};

Player.prototype.update = function () {
    // check reaching the end safely. 
    if (this.y < 0) {
        resetPosition();
        updateScore();
    }
    //Checking Collision
    checkCollision();
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// A lot of enemies :DD
var enemy1 = new Enemy(-100, 50);
var enemy2 = new Enemy(0, 50);
var enemy3 = new Enemy(50, 140);
var enemy4 = new Enemy(30, 140);
var enemy5 = new Enemy(-60, 220);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

//Our Player
var player = new Player(200, 390);

// Other Functions

function checkCollision() {
    allEnemies.forEach(function (enemy) {
        // this.x gives sprite center
        // Half bug sprite width 101/2 = 50
        // Half bug sprite height 170/2 = 85

        if (player.x > enemy.x - 85 && player.x < enemy.x + 85 && player.y > enemy.y - 50 && player.y < enemy.y + 50) {
            // If collision happens, reset player position and decrease lives. 
            resetPosition();
            updateLives();
        }
    })
}

function updateScore() {
    score += 20;
    scoreContainer.innerHTML = `Score : ${score}`;
}

function updateLives() {
    lives--;
    livesContainer.innerHTML = `Lives : ${lives}`;
    if (lives === 0) {
        gameOver();
    }
}

function resetPosition() {
    player.x = 200;
    player.y = 390;
}

function gameOver() {
    alert(`GameOver !  Your Score is : ${score} 
Play again ?`);
    resetGame();
}

function resetGame() {
    score = 0;
    lives = 3;
    scoreContainer.innerHTML = `Score : ${score}`;
    livesContainer.innerHTML = `Lives : ${lives}`;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
