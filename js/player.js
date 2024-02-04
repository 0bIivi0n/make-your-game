var player = document.getElementById("player");
var playerMissileFired = false;
const speed = 10;
var score = 0;
player.health = 3;

const maxX = (canvas.offsetWidth - player.offsetWidth) - 25;
const maxY = (canvas.offsetHeight - player.offsetHeight)- 10;

// player position
let playerX = maxX / 2;
let playerY = maxY;

// Listener for key press
document.addEventListener("keydown", (e) => {
    if(IDanimation != 0) {

         // keys pressed
        switch (e.key) {
            case "ArrowLeft": 
                playerX = Math.max(25, playerX - speed);
                break;
            case "ArrowRight":
                playerX = Math.min(maxX, playerX + speed);
                break;
            case " ":
                if (!playerMissileFired) {
                    makePlayerShoot();
                }
                break;
        }

        // move player
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";

    }
   
});

function makePlayerShoot() {
    var playerPos = Number((getComputedStyle(player).left).split('px')[0]);

    var playerMissile = document.createElement("div");
    playerMissile.id = "player-missile";

    playerPos += 23;
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

        if(checkCollision(playerMissile, enemy)) {
            enemy.remove();
            playerMissile.remove();
            playerMissileFired = false;
            score += 20;
            document.getElementById("score").innerHTML="<strong>Score: " + score + " </strong>";
        }
    });

    if(missilePos <= 0) {
        playerMissile.remove();
        playerMissileFired = false;
    }
}

function printHealth() {

    var livesElm = document.getElementById("health");
    livesElm.innerHTML = "<strong>Lives: </strong>";

    for(let i = 0; i < player.health; i++) {
        var life = document.createElement("img");
        life.classList.add("life");
        life.src = "assets/img/player.svg";
        livesElm.appendChild(life);
    }
}



