let timeText;
let currentTime;
let startTime = new Date();
let body = document.getElementsByTagName('body');
let scorePanel = document.getElementsByClassName('score-panel')[0];


// Enemies our player must avoid
var Enemy = function(x, y, v) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.v = v;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.v*dt;
    if (this.x > 700) {
        this.x = 1;
    }
    collision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y) {
  this.sprite = 'images/char-horn-girl.png';
  this.x = x;
  this.y = y;

};
Player.prototype.update = function(dt) {
    borderStop(this);
    if (player.y + 50 < 60) {
        win();
        player.y = 200;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    switch (allowedKeys) {
       case 'left': this.x = this.x - 100;
            break;
       case 'up': this.y = this.y  - 82;
            break;
       case 'right': this.x = this.x + 100;
            break;
       case 'down': this.y = this.y  + 82;
           break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player(410, 440);
let allEnemies = [new Enemy(20, 130, 50), new Enemy(30, 220, 60), new Enemy(40, 300, 70)];
setInterval(function () {
    currentTime = Math.floor((new Date() - startTime) / 1000);
    timeText.textContent = "Time: " + currentTime  + " sec";
}, 1000);


timer();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//collisions
let collision = function (enemy) {
    if (
        //player moves from right
        (player.x <= enemy.x + 100
            && player.x >= enemy.x
        && player.y + 20 >= enemy.y
        &&  player.y + 20 <= enemy.y + 75)
        //player moves from bottom
        || (player.y + 20 >= enemy.y + 75
        && player.y + 20 <= enemy.y
        && player.x >= enemy.x
        && player.x <= enemy.x + 90)
        //player moves from left
        || (player.y + 20 >= enemy.y
        && player.y + 20 <= enemy.y + 75
        && player.x + 80 >= enemy.x
        && player.x + 20 <= enemy.x + 90)
        //player moves from top
        || (player.x >= enemy.x
        && player.x <= enemy.x + 90
        && player.y + 90 >= enemy.y
        && player.y + 90 <= enemy.y + 75)
    ) { player.x = 410;
        player.y = 440;
    }
};

//player doesn't cross the borders

let borderStop = function (player) {
    if (player.x > 420) {
        player.x = 420;
    };
    if (player.y > 450) {
        player.y = 450;
    };
    if ((player.x) < 1) {
        (player.x) = 1;
    };
    if (player.y < 1) {
        player.y = 1;
    };
};

let win = function (player) {



        document.body.innerHTML = "";
        let time = new Date() - startTime;
        let congratDiv = document.createElement("div");
        document.body.appendChild(congratDiv);
        congratDiv.className = "congratDiv";
        let myHead = document.createElement("h1");
        let headText = document.createTextNode("Congratulations!");
        myHead.appendChild(headText);
        congratDiv.appendChild(myHead);
        let myPar = document.createElement("p");
        let parText = document.createTextNode("You win!");
        myPar.appendChild(parText);
        congratDiv.appendChild(myPar);
        let myPar2 = document.createElement("p");
        let parText2 = document.createTextNode("Your time: " + time/1000 + " seconds." +  "  Wanna play again?");
        myPar2.appendChild(parText2);
        congratDiv.appendChild(myPar2);


};

function timer() {
    let timeDiv = document.createElement("div");
    scorePanel.appendChild(timeDiv);
    timeDiv.className = "timeDiv";
    timeText = document.createTextNode("");
    timeDiv.appendChild(timeText);
};