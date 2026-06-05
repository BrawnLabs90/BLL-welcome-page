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

/* ==========================
   ROCKET
========================== */

class Rocket {

    constructor(side) {

        if (side === "left") {
            this.x = 100;
        } else {
            this.x = canvas.width - 100;
        }

        this.y = canvas.height + 20;

        this.targetX =
            canvas.width * (0.25 + Math.random() * 0.5);

        this.targetY =
            80 + Math.random() * 220;

        this.speed = 0.025;

        this.progress = 0;
    }

    update() {

        this.progress += this.speed;

        let t = this.progress;

        let x =
            this.x +
            (this.targetX - this.x) * t;

        let y =
            this.y +
            (this.targetY - this.y) * t;

        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.lineTo(
            x - 20,
            y + 40
        );

        ctx.strokeStyle =
            "rgba(255,180,50,0.7)";

        ctx.lineWidth = 2;

        ctx.stroke();

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "#fff";

        ctx.fill();

        if (this.progress >= 1) {

            createExplosion(
                this.targetX,
                this.targetY
            );

            return false;
        }

        return true;
    }
}

/* ==========================
   PARTICLE
========================== */

class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.angle =
            Math.random() * Math.PI * 2;

        this.speed =
            Math.random() * 8 + 2;

        this.life = 120;

        this.size =
            Math.random() * 3 + 1;
    }

    update() {

        this.x +=
            Math.cos(this.angle) *
            this.speed;

        this.y +=
            Math.sin(this.angle) *
            this.speed;

        this.speed *= 0.97;

        this.life--;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            this.color;

        ctx.fill();
    }
}

/* ==========================
   FIREWORK EXPLOSION
========================== */

function createExplosion(x, y) {

    const colors = [

        "#FFD700",
        "#FF4500",
        "#FFFFFF",
        "#00FFFF",
        "#00FF99",
        "#FFA500"

    ];

    for (let i = 0; i < 220; i++) {

        particles.push(

            new Particle(
                x,
                y,
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ]
            )
        );
    }
}

/* ==========================
   SPARKLES
========================== */

function drawSparkles() {

    for (let i = 0; i < 20; i++) {

        let x =
            Math.random() *
            canvas.width;

        let y =
            Math.random() *
            canvas.height;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            1.5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "rgba(255,215,0,0.4)";

        ctx.fill();
    }
}

/* ==========================
   CONFETTI
========================== */

const confettiContainer =
    document.getElementById(
        "confetti-container"
    );

function createConfetti() {

    const confetti =
        document.createElement("div");

    confetti.className =
        "confetti";

    confetti.style.left =
        Math.random() * 100 + "%";

    const colors = [

        "#FFD700",
        "#FF0000",
        "#00FFFF",
        "#FFFFFF",
        "#FFA500"

    ];

    confetti.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    confetti.style.animationDuration =
        (
            4 +
            Math.random() * 6
        ) + "s";

    confettiContainer.appendChild(
        confetti
    );

    setTimeout(() => {

        confetti.remove();

    }, 10000);
}

setInterval(
    createConfetti,
    150
);

/* ==========================
   ROCKET LAUNCH
========================== */

setInterval(() => {

    rockets.push(
        new Rocket("left")
    );

}, 2500);

setInterval(() => {

    rockets.push(
        new Rocket("right")
    );

}, 2800);

/* ==========================
   ANIMATION LOOP
========================== */

function animate() {

    requestAnimationFrame(
        animate
    );

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    drawSparkles();

    rockets =
        rockets.filter(
            rocket =>
                rocket.update()
        );

    particles =
        particles.filter(
            particle => {

                particle.update();

                return (
                    particle.life > 0
                );
            }
        );
}

animate();
