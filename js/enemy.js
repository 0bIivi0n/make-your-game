var nb = 20;
var marginLeft = 0;
var marginTop = 0;
var enemyMissileFired = false;
var missileXPos;
var IDanimation = 0;
var enemySpeed = 0.5;

function spawnEnemies(add) {

    if (add != null) {
        nb += add;
    }

    var enemyX = 75;
    var enemyY = 10;
    var row = (nb/10);
    var enemyContainer = document.getElementById("enemy-container");

    for (let i = 0; i < row; i++ ) {
        var rowElm = document.createElement("div");
        rowElm.id = "row" + (i+1);
        rowElm.isEmpty = false;
        rowElm.classList.add("row");

        for (let j = 0; j < 10; j++) {
            var enemy = document.createElement("div");
            enemy.id = "enemy" + (j+1);
            enemy.classList.add("enemy");
            enemy.style.left = enemyX + "px";
            enemy.style.top = enemyY + "px";
            enemyX += 55;

            // Add their image
            var enemyImage = document.createElement("img");
            enemyImage.classList.add("enemyImage");

            if(j % 3 === 0) {
                enemyImage.src = "assets/img/invaders1.svg";
            } else if(j % 2){
                enemyImage.src = "assets/img/invaders2.svg";
            } else {
                enemyImage.src = "assets/img/invaders3.svg";
            }

            enemy.appendChild(enemyImage);

            rowElm.appendChild(enemy);
        }
        enemyContainer.appendChild(rowElm);
        enemyY += 55;
        enemyX = 75;
    }
}


function animate() {

    var enemies = document.querySelectorAll(".enemy");
    var invaded = false;
    var enemyContainer = document.getElementById("enemy-container");
    var bottomBorder = document.getElementById("border-bottom");

    let NBanimation = 0, nbFPS = 10;


    NBanimation++;

     moveEnemy();
     
     if (playerMissileFired) {
        movePlayerMissile();
     }

     if (enemyMissileFired) {
        moveEnemyMissile();
     }
     
    // Toutes les nbFPS animations, maj du contenu div#fps
    if (NBanimation % nbFPS == 0) {
        var microtime2=window.performance.now();
        // Temps écoulé depuis le dernier appel
        var delai=microtime2-microtime1;
        // Conversion en FPS (frame par seconde)
        var fps = Math.round(1/delai*1000*nbFPS);
        document.getElementById("fps").innerHTML= "<strong>" + fps + " FPS </strong>" ;
        microtime1=microtime2;
    }

    enemies.forEach(enemy => {
        
        if(checkCollision(enemy, bottomBorder)) {
            invaded = true;
            enemy.remove();
        }

        if(checkCollision(enemy, player)) {
            player.health--;
            enemy.remove();
            printHealth();
        }

    });

    if(enemies.length === 0) {
        congratulations();
        cancelAnimationFrame(IDanimation);
        clearInterval(timer);
        clearInterval(enemyAttackID);
        enemyContainer.remove();
        marginLeft = 0;
        marginTop = 0;
        return;
    }

    if(invaded || player.health <= 0) {
        gameOver();
        cancelAnimationFrame(IDanimation);
        clearInterval(timer);
        clearInterval(enemyAttackID);
        player.remove();
        return
    }


    IDanimation = requestAnimationFrame(animate);
    
}

function moveEnemy() {

    let rightBorder = document.getElementById("border-right");
    let leftBorder = document.getElementById("border-left");
    const enemy = document.getElementById("enemy-container");
    var enemyLimits = enemy.getBoundingClientRect(enemy);
    var leftBorderLimits = leftBorder.getBoundingClientRect(leftBorder);
    var rightBorderLimits = rightBorder.getBoundingClientRect(rightBorder);

    if(enemyLimits.right-60 >= rightBorderLimits.left || enemyLimits.left + 90 <= leftBorderLimits.right) {
        enemySpeed *= -1;
        marginTop += 50;
    }

    marginLeft += enemySpeed;
    enemy.style.transform = "translateX(" + marginLeft + "px";
    enemy.style.marginTop = marginTop + "px";

}

function moveEnemyMissile() {
    let speed = 10;
    var enemyMissile = document.getElementById("enemy-missile");
    var player = document.getElementById("player");
    var missilePos = Number((getComputedStyle(enemyMissile).top).split("px")[0]);
    var missileXPos = Number((getComputedStyle(enemyMissile).left).split("px")[0]);
    var bottomBorder = document.getElementById("border-bottom");
    var bottomBorderLimits = bottomBorder.getBoundingClientRect(bottomBorder);
    var enemyMissileLimits = enemyMissile.getBoundingClientRect(enemyMissile);

    missilePos += speed;
    missileXPos -= enemySpeed;

    enemyMissile.style.top = missilePos + "px";
    enemyMissile.style.left = missileXPos + "px";

    if(checkCollision(enemyMissile, player)) {
        enemyMissile.remove();
        enemyMissileFired = false;
        player.health--;
        printHealth();
    }

    if(enemyMissileLimits.bottom >= bottomBorderLimits.top) {
        enemyMissile.remove();
        enemyMissileFired = false;
    }
}

function makeEnemyShoot() {

    if(!enemyMissileFired) {
        var enemies = document.querySelectorAll(".enemy");
        var enemyContainer = document.getElementById("enemy-container");

        let randNum = getRandomInt(0, enemies.length);

        let randEnemy = enemies[randNum];
        //console.log(randEnemy);

        var enemyPos = Number((getComputedStyle(randEnemy).left).split('px')[0]);
        var enemyYPos = Number((getComputedStyle(randEnemy).top).split('px')[0]);
        //console.log(enemyPos);

        enemyPos += 25;
        enemyYPos += 25;
        missileXPos = enemyPos;

        var enemyMissile = document.createElement("div");
        enemyMissile.id = "enemy-missile";
        enemyMissile.style.left = enemyPos + "px";
        enemyMissile.style.top = enemyYPos + "px";
        //console.log(enemyMissile.style.left);

        enemyContainer.appendChild(enemyMissile);
        enemyMissileFired = true;
    }
}

var microtime1 = window.performance.now();