// script.js
const canvas = document.getElementById('bouncingCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Ball class
class Ball {
    constructor() {
        this.x = Math.random() * canvas.width; // Random x position
        this.y = Math.random() * canvas.height; // Random y position
        this.size = Math.random() * 30 + 10; // Size between 10 and 40
        this.speedX = (Math.random() - 0.5) * 4; // Random speed in x direction
        this.speedY = (Math.random() - 0.5) * 4; // Random speed in y direction
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX; // Reverse x direction
            this.size = Math.random() * 30 + 10; // Change size on bounce
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Change color on bounce
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY; // Reverse y direction
            this.size = Math.random() * 30 + 10; // Change size on bounce
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Change color on bounce
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const balls = [];

// Create a specified number of balls
const numberOfBalls = 20; // Change this number for more or fewer balls
for (let i = 0; i < numberOfBalls; i++) {
    balls.push(new Ball());
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    balls.forEach(ball => {
        ball.update();
        ball.draw();
    });
    requestAnimationFrame(animate); // Loop the animation
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
animate();