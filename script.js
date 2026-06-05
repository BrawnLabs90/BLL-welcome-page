const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let rockets = [];
let particles = [];

class Rocket {

    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.speed = 8 + Math.random() * 3;
        this.targetY = 100 + Math.random() * 250;
        this.color = "white";
    }

    update() {

        this.y -= this.speed;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 20);
        ctx.strokeStyle = "rgba(255,255,255,0.4)";
        ctx.stroke();

        if (this.y <= this.targetY) {
            explode(this.x, this.y);
            return false;
        }

        return true;
    }
}

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;
        this.color = color;

        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 8 + 2;

        this.life = 100;
        this.size = Math.random() * 3 + 1;
    }

    update() {

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.speed *= 0.97;
        this.life--;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

function explode(x, y) {

    const colors = [
        "#ff0000",
        "#00ff00",
        "#00ffff",
        "#ffff00",
        "#ff00ff",
        "#ffffff",
        "#ffa500",
        "#FFD700"
    ];

    for (let i = 0; i < 180; i++) {

        particles.push(
            new Particle(
                x,
                y,
                colors[Math.floor(Math.random() * colors.length)]
            )
        );
    }
}

function animate() {

    requestAnimationFrame(animate);

    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.04) {
        rockets.push(new Rocket());
    }

    rockets = rockets.filter(rocket => rocket.update());

    particles = particles.filter(particle => {
        particle.update();
        return particle.life > 0;
    });
}

animate();
