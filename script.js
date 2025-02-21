const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 200;

let player = { x: 50, y: 150, width: 20, height: 20, velocityY: 0, jumping: false };
let gravity = 0.5;
let ground = 150;
let obstacles = [];
let gameSpeed = 3;
let score = 0;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !player.jumping) {
        player.velocityY = -10;
        player.jumping = true;
    }
});

function update() {
    player.velocityY += gravity;
    player.y += player.velocityY;

    if (player.y >= ground) {
        player.y = ground;
        player.jumping = false;
    }

    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, y: ground, width: 20, height: 20 });
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= gameSpeed;

        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            score++;
        }

        if (
            player.x < obstacles[i].x + obstacles[i].width &&
            player.x + player.width > obstacles[i].x &&
            player.y < obstacles[i].y + obstacles[i].height &&
            player.y + player.height > obstacles[i].y
        ) {
            alert("Game Over! Score: " + score);
            document.location.reload();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "red";
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, 10, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
