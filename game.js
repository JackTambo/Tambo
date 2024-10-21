const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas'), antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({
    color: 0x007bff,
    metalness: 0.2,
    roughness: 0.5
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

camera.position.z = 5;

function lerpColor(color1, color2, t) {
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    return c1.lerp(c2, t);
}

function getRandomColor() {
    return Math.random() * 0xffffff;
}

let startColor = 0x007bff;
let endColor = getRandomColor();
let transitionDuration = 10000;
let startTime = Date.now();

let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let rotationSpeed = { x: 0, y: 0 }; 
const rotationFriction = 0.995; 
const sensitivity = 0.001; 

window.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const deltaX = event.clientX - previousMousePosition.x;
        const deltaY = event.clientY - previousMousePosition.y;
        rotationSpeed.x += deltaY * sensitivity; 
        rotationSpeed.y += deltaX * sensitivity; 
        previousMousePosition = { x: event.clientX, y: event.clientY };
    }
});

window.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
});

window.addEventListener('touchend', () => {
    isDragging = false;
});

window.addEventListener('touchmove', (event) => {
    if (isDragging && event.touches.length === 1) {
        const deltaX = event.touches[0].clientX - previousMousePosition.x;
        const deltaY = event.touches[0].clientY - previousMousePosition.y;
        rotationSpeed.x += deltaY * sensitivity; 
        rotationSpeed.y += deltaX * sensitivity; 
        previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    }
});

function animate() {
    requestAnimationFrame(animate);

    
    cube.rotation.x += rotationSpeed.x;
    cube.rotation.y += rotationSpeed.y;

    
    rotationSpeed.x *= rotationFriction;
    rotationSpeed.y *= rotationFriction;

    
    if (Math.abs(rotationSpeed.x) < 0.0001) rotationSpeed.x = 0;
    if (Math.abs(rotationSpeed.y) < 0.0001) rotationSpeed.y = 0;

    let elapsedTime = Date.now() - startTime;
    let t = elapsedTime / transitionDuration;

    if (t > 1) {
        startColor = endColor;
        endColor = getRandomColor();
        startTime = Date.now();
        t = 0;
    }

    cube.material.color.set(lerpColor(startColor, endColor, t));
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

animate();