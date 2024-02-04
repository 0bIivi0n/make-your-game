var player = document.getElementById("player");
var playerMissileFired = false;
const speed = 10;
var score = 0;
player.health = 3;
var rightKeyDown = false;
var leftKeyDown = false;

// const maxX = (canvas.offsetWidth - player.offsetWidth) - 25;
// const maxY = (canvas.offsetHeight - player.offsetHeight)- 10;

// player position
//var playerX = maxX / 2;
var playerX = 0;

// Listener for key press
document.addEventListener("keydown", (e) => {
    if (IDanimation != 0) {

        // keys pressed
        switch (e.key) {
            case "ArrowLeft":
                //playerX = Math.max(25, playerX - speed);
                //playerX -= speed;
                leftKeyDown = true;
                break;
            case "ArrowRight":
                //playerX = Math.min(maxX, playerX + speed);
                //playerX += speed;
                rightKeyDown = true;
                break;
            case " ":
                if (!playerMissileFired) {
                    makePlayerShoot();
                }
                break;
        }
    }

});

document.addEventListener("keyup", (e) => {
    if (IDanimation != 0) {

        // keys pressed
        switch (e.key) {
            case "ArrowLeft":
                leftKeyDown = false;
                break;
            case "ArrowRight":
                rightKeyDown = false;
                break;
        }
    }

});



function movePlayer() {

    var playerlimits = player.getBoundingClientRect(player);

    if (rightKeyDown && playerlimits.right < rightBorderLimits.left) {
        playerX += speed;
    }

    if (leftKeyDown && playerlimits.left > leftBorderLimits.right) {
        playerX -= speed;
    }

    player.style.transform = "translateX(" + playerX + "px)";
}


function makePlayerShoot() {
    var playerlimits = player.getBoundingClientRect(player);

    var playerMissile = document.createElement("div");
    playerMissile.id = "player-missile";

    let playerPos = playerlimits.left + 15;
    playerMissile.style.left = playerPos + "px";

    playerZone.appendChild(playerMissile);
    playerMissileFired = true;
}

function movePlayerMissile() {
    let speed = 10;
    var playerMissile = document.getElementById("player-missile");
    var enemies = document.querySelectorAll(".enemy");
    var missilePos = Number((getComputedStyle(playerMissile).top).split("px")[0]);
    missilePos -= speed;

    playerMissile.style.top = missilePos + "px";

    enemies.forEach(enemy => {

        if (checkCollision(playerMissile, enemy)) {
            enemy.remove();
            playerMissile.remove();
            playerMissileFired = false;
            score += 20;
            document.getElementById("score").innerHTML = "<strong>Score: " + score + " </strong>";
        }
    });

    if (missilePos <= 0) {
        playerMissile.remove();
        playerMissileFired = false;
    }
}

function printHealth() {

    var livesElm = document.getElementById("health");
    livesElm.innerHTML = "<strong>Lives: </strong>";

    for (let i = 0; i < player.health; i++) {
        var life = document.createElement("img");
        life.classList.add("life");
        life.src = "assets/img/player.svg";
        livesElm.appendChild(life);
    }
}



