const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const canvasMenores = document.getElementById('estrelasmaiores');
const ctxMenores = canvasMenores.getContext('2d');
canvasMenores.width = window.innerWidth;
canvasMenores.height = window.innerHeight;

const particles = [];
const particlesMenores = [];

class Particle {
    constructor(x, y, sizeMultiplier = 1, opacitySpeedMultiplier = 1) {
        this.x = x;
        this.y = y;
        this.baseSize = (Math.random() * 1.5 + 0.5) * sizeMultiplier;
        this.size = this.baseSize;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random();
        this.opacitySpeed = (Math.random() * 0.02 + 0.01) * opacitySpeedMultiplier;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.opacitySpeed;
        if (this.opacity >= 1 || this.opacity <= 0) {
            this.opacitySpeed *= -1;
        }
        this.size = this.baseSize + Math.sin(this.opacity * Math.PI);
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function createParticles(xPos, yPos) {
    particles.push(new Particle(xPos, yPos));
}

function createParticlesMenores(xPos, yPos) {
    particlesMenores.push(new Particle(xPos, yPos, 0.5, 0.5)); // Estrelas menores e com brilho mais suave
}

function generateParticlesAutomatically() {
    const xPos = Math.random() * canvas.width;
    const yPos = Math.random() * canvas.height;
    createParticles(xPos, yPos);
}

function generateParticlesMenoresAutomatically() {
    const xPos = Math.random() * canvasMenores.width;
    const yPos = Math.random() * canvasMenores.height;
    createParticlesMenores(xPos, yPos);
}

setInterval(generateParticlesAutomatically, 100);
setInterval(generateParticlesMenoresAutomatically, 150); // Intervalo ligeiramente maior para as estrelas menores

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxMenores.clearRect(0, 0, canvasMenores.width, canvasMenores.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }

    for (let i = 0; i < particlesMenores.length; i++) {
        particlesMenores[i].update();
        particlesMenores[i].draw(ctxMenores);
        if (particlesMenores[i].size <= 0.2) {
            particlesMenores.splice(i, 1);
            i--;
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
