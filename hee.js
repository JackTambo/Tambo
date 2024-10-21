// script.js
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5; // Size between 5 and 15
        this.speedX = (Math.random() * 4 - 2) * 1.5; // Increased speed in x direction
        this.speedY = (Math.random() * 4 - 2) * 1.5; // Increased speed in y direction
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; // Random color
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.size *= 0.95; // Shrink over time
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];

// Create particles on mouse move
canvas.addEventListener('mousemove', (event) => {
    const x = event.x;
    const y = event.y;
    for (let i = 0; i < 10; i++) { // Create more particles on mouse move
        particles.push(new Particle(x, y));
    }
});

// Prevent default scrolling behavior
canvas.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent scrolling with the mouse wheel
});

canvas.addEventListener('mousedown', (event) => {
    event.preventDefault(); // Prevent text selection on mousedown
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove particles that are too small
        if (particle.size <= 0.5) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animate);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
animate();