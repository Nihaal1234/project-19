let playerX;
let playerY;
let playerVelocity;
let playerGravity;
let obstacles;
let gameover;
let resetButton;

function setup() {
  createCanvas(400, 300);
  playerX = 50;
  playerY = height - 50;
  playerVelocity = 0;
  playerGravity = 0.6;
  obstacles = [];
  gameover = false;

  resetButton = createButton('Reset');
  resetButton.position(width / 2 - 25, height / 2 + 20);
  resetButton.mousePressed(resetGame);

  // Set up obstacle spawning interval
  setInterval(() => {
    if (!gameover) {
      obstacles.push(createObstacle());
    }
  }, 1500);
}

function draw() {
  background(220);

  if (!gameover) {
    // Update and display player
    updatePlayer();
    displayPlayer();

    // Check for collisions with obstacles
    for (let i = obstacles.length - 1; i >= 0; i--) {
      updateObstacle(obstacles[i]);
      displayObstacle(obstacles[i]);

      if (collides(playerX, playerY, obstacles[i])) {
        console.log('Game over!');
        gameover = true;
        resetButton.show();
      }

      if (offscreen(obstacles[i])) {
        obstacles.splice(i, 1);
      }
    }
  } else {
    // Game over display
    fill(255, 0, 0);
    textSize(30);
    textAlign(CENTER);
    text('Game Over', width / 2, height / 2);
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW && playerY === height - 50) {
    playerVelocity = -15; // Jump
  }
}

function updatePlayer() {
  playerVelocity += playerGravity;
  playerY += playerVelocity;

  if (playerY >= height - 50) {
    playerY = height - 50;
    playerVelocity = 0;
  }
}

function displayPlayer() {
  fill(0);
  rect(playerX, playerY, 20, 20);
}

function createObstacle() {
  const obstacle = {
    x: width,
    y: height - 50,
    width: 20,
    height: 50,
    speed: 5
  };
  return obstacle;
}

function updateObstacle(obstacle) {
  obstacle.x -= obstacle.speed;
}

function displayObstacle(obstacle) {
  fill(255, 0, 0);
  rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

function collides(playerX, playerY, obstacle) {
  if (
    playerX + 20 > obstacle.x &&
    playerX < obstacle.x + obstacle.width &&
    playerY + 20 > obstacle.y &&
    playerY < obstacle.y + obstacle.height
  ) {
    return true;
  }
  return false;
}

function offscreen(obstacle) {
  if (obstacle.x + obstacle.width < 0) {
    return true;
  }
  return false;
}

function resetGame() {
  playerX = 50;
  playerY = height - 50;
  playerVelocity = 0;
  obstacles = [];
  gameover = false;
  resetButton.hide();
}
