// script.js
const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Ripple {
    constructor(x, y) {
        this.x = x; // Center X of the ripple
        this.y = y; // Center Y of the ripple
        this.radius = 0; // Initial radius
        this.maxRadius = Math.random() * 100 + 50; // Random max radius between 50 and 150
        this.alpha = 1; // Full opacity
    }

    update() {
        this.radius += 2; // Increase radius for the ripple effect
        this.alpha -= 0.02; // Fade out effect
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha; // Set alpha for transparency
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)'; // White color for the ripple
        ctx.lineWidth = 2; // Line width
        ctx.stroke();
        ctx.restore();
    }
}

let ripples = [];

// Create ripples on mouse click or touch
function createRipple(event) {
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX || event.touches[0].clientX) - rect.left; // Adjust for canvas position
    const y = (event.clientY || event.touches[0].clientY) - rect.top; // Adjust for canvas position
    ripples.push(new Ripple(x, y)); // Add new ripple
}

// Event listeners for mouse and touch
canvas.addEventListener('click', createRipple);
canvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent default touch behavior
    createRipple(event);
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ripples.forEach((ripple, index) => {
        ripple.update(); // Update ripple properties
        ripple.draw(); // Draw ripple

        // Remove ripples that have faded out
        if (ripple.alpha <= 0) {
            ripples.splice(index, 1); // Remove ripple from array
        }
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