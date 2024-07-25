// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions
canvas.width = 1080;
canvas.height = 7200;

// Game variables
let playerX = canvas.width / 2;
let playerY = canvas.height - 50;
let playerSpeed = 5;
let bulletSpeed = 5;
let alienSpeed = 2;
let aliens = [];
let bullets = [];
let score = 0;

// Initialize game
function initGame() {
    // Create aliens
    for (let i = 0; i < 10; i++) {
        aliens.push({
            x: i * 50 + 50,
            y: 50,
            width: 30,
            height: 30
        });
    }

    // Set up event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Start game loop
    setInterval(updateGame, 16);
}

// Update game state
function updateGame() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = '#fff';
    ctx.fillRect(playerX, playerY, 50, 50);

    // Draw aliens
    for (let i = 0; i < aliens.length; i++) {
        ctx.fillStyle = '#f00';
        ctx.fillRect(aliens[i].x, aliens[i].y, aliens[i].width, aliens[i].height);

        // Move aliens
        aliens[i].x += alienSpeed;

        // Check collision with player
        if (checkCollision(playerX, playerY, 50, 50, aliens[i].x, aliens[i].y, aliens[i].width, aliens[i].height)) {
            alert('Game Over!');
            return;
        }
    }

    // Draw bullets
    for (let i = 0; i < bullets.length; i++) {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(bullets[i].x, bullets[i].y, 10, 10);

        // Move bullets
        bullets[i].y -= bulletSpeed;

        // Check collision with aliens
        for (let j = 0; j < aliens.length; j++) {
            if (checkCollision(bullets[i].x, bullets[i].y, 10, 10, aliens[j].x, aliens[j].y, aliens[j].width, aliens[j].height)) {
                aliens.splice(j, 1);
                bullets.splice(i, 1);
                score++;
            }
        }
    }

    // Update score
    ctx.font = '24px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

// Handle key presses
function handleKeyDown(e) {
    switch (e.key) {
        case 'ArrowLeft':
            playerX -= playerSpeed;
            break;
        case 'ArrowRight':
            playerX += playerSpeed;
            break;
        case ' ':
            bullets.push({
                x: playerX + 25,
                y: playerY
            });
            break;
    }
}

// Handle key releases
function handleKeyUp(e) {
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            playerSpeed = 0;
            break;
    }
}

// Check collision between two rectangles
function checkCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2) {
        return true;
    }
    return false;
}

// Initialize game
initGame();
