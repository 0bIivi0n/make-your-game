var pauseButton = document.getElementById("toggle");
var startMenu = document.getElementById("start-menu");
var startButton = document.getElementById("start-button");
var timer;
var enemyAttackID;
var enemyAttackInterval = 5000;
var min = 0;
var sec = 0;

createEnemyContainer();
spawnEnemies();

function startGame() {
    var restartButton = document.getElementById("restart");
    var nextLevelButton = document.getElementById("next-level-button");

    if (playerMissileFired) {
        var playerMissile = document.getElementById("player-missile");
        playerMissile.remove();
        playerMissileFired = false;
    }

    if (enemyMissileFired) {
        var enemyMissile = document.getElementById("enemy-missile");
        enemyMissile.remove();
        enemyMissileFired = false;
    }

    startTimer();
    enemyAttackID = setInterval(makeEnemyShoot, enemyAttackInterval);
    printHealth();
    animate();
    startMenu.style.opacity = "0";
    pauseButton.style.display = "block";
    player.style.opacity = "1";
    restartButton.style.display = "block";
    startButton.disabled = true;
    startButton.style.opacity = "0";
    nextLevelButton.disabled = true;

    console.log("Enemy speed: " + enemySpeed + ", Enemy attack Interval: " + enemyAttackInterval);
}

function startPage() {

    const startPage = document.getElementById("start-menu");
    startPage.style.opacity = "1";
    startButton.disabled = false;
    startButton.style.opacity = "1";

}

function gameOver() {

    const gameOverPage = document.getElementById("game-over");
    gameOverPage.style.opacity = "1";
    
}

function congratulations() {
    const gratsPage = document.getElementById("grats");
    var nextLevelButton = document.getElementById("next-level-button");
   
    gratsPage.style.opacity = "1";
    nextLevelButton.disabled = false;
}



function toggleAnimation() {
    //console.log(IDanimation)
    startMenu.style.opacity = "1";
    if (IDanimation==0) { // Animation stoppée : on la relance
        animate();
        startMenu.style.opacity = "0";
        document.getElementById("toggle").innerHTML="Pause";
        startTimer();
    } else {  // Arrêt de l'animation
        cancelAnimationFrame(IDanimation);
        IDanimation=0;
        document.getElementById("toggle").innerHTML="Resume";
        clearInterval(timer);
        clearInterval(enemyAttackInterval);
    }
}

function closeGratsPage() {
    document.getElementById("grats").style.opacity = "0";
}

function createEnemyContainer() {
    var container = document.createElement("div");
    container.id = "enemy-container";
    document.getElementById("enemy-wrapper").appendChild(container);
}

function startTimer() {
    timer = setInterval(() => {
        sec++;
        if(sec > 59) {
            min++;
            sec = 0;
        }
        document.getElementById("timer").innerHTML="<strong>Timer: " + min +"m, " + sec + "s </strong>";
    }, 1000)
}

function getRandomInt(min, max) {
    var minCeiled = Math.ceil(min);
    var maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function setNextLevel() {

    console.log("setNextLevel entered");

    createEnemyContainer(); 
    spawnEnemies(10);
    enemyAttackInterval -= 500;
    enemySpeed += 0.1;
    closeGratsPage(); 
    startPage();
}




