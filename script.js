const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

/* ==========================
   CANVAS RESIZE
========================== */

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* ==========================
   ARRAYS
========================== */

let rockets = [];
let particles = [];
let sparkles = [];

/* ==========================
   ROCKET CLASS
========================== */

class Rocket {

    constructor(side) {

        this.startX =
            side === "left"
            ? 80
            : canvas.width - 80;

        this.startY =
            canvas.height + 30;

        this.targetX =
            canvas.width * (
                0.25 +
                Math.random() * 0.5
            );

        this.targetY =
            120 +
            Math.random() * 220;

        this.progress = 0;

        this.speed =
            0.02 +
            Math.random() * 0.015;
    }

    update() {

        this.progress += this.speed;

        let x =
            this.startX +
            (
                this.targetX -
                this.startX
            ) * this.progress;

        let y =
            this.startY +
            (
                this.targetY -
                this.startY
            ) * this.progress;

        ctx.beginPath();

        ctx.moveTo(x, y);

        ctx.lineTo(
            x - 15,
            y + 30
        );

        ctx.strokeStyle =
            "rgba(255,200,50,0.8)";

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

        ctx.fillStyle =
            "#ffffff";

        ctx.fill();

        if (
            this.progress >= 1
        ) {

            explode(
                this.targetX,
                this.targetY
            );

            return false;
        }

        return true;
    }
}

/* ==========================
   PARTICLE CLASS
========================== */

class Particle {

    constructor(
        x,
        y,
        color
    ) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.angle =
            Math.random() *
            Math.PI * 2;

        this.speed =
            Math.random() * 8 + 2;

        this.life = 120;

        this.size =
            Math.random() * 3 + 1;
    }

    update() {

        this.x +=
            Math.cos(
                this.angle
            ) * this.speed;

        this.y +=
            Math.sin(
                this.angle
            ) * this.speed;

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

function explode(
    x,
    y
) {

    const colors = [

        "#FFD700",
        "#FFA500",
        "#FFFFFF",
        "#FF4040",
        "#00FFFF",
        "#00FF99"

    ];

    for (
        let i = 0;
        i < 220;
        i++
    ) {

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
   GOLDEN SPARKLES
========================== */

function createSparkles() {

    sparkles.push({

        x:
            Math.random() *
            canvas.width,

        y:
            Math.random() *
            canvas.height,

        radius:
            Math.random() * 2 + 1,

        alpha:
            Math.random(),

        speed:
            Math.random() * 0.01
    });

    if (
        sparkles.length > 120
    ) {

        sparkles.shift();
    }
}

setInterval(
    createSparkles,
    200
);

/* ==========================
   CONFETTI
========================== */

const confettiContainer =
    document.getElementById(
        "confetti-container"
    );

function createConfetti() {

    const piece =
        document.createElement(
            "div"
        );

    piece.className =
        "confetti";

    piece.style.left =
        Math.random() * 100 +
        "%";

    const colors = [

        "#FFD700",
        "#FFFFFF",
        "#FFA500",
        "#00FFFF",
        "#FF4040"

    ];

    piece.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];

    piece.style.animationDuration =
        (
            5 +
            Math.random() * 6
        ) + "s";

    confettiContainer.appendChild(
        piece
    );

    setTimeout(() => {

        piece.remove();

    }, 12000);
}

setInterval(
    createConfetti,
    150
);

/* ==========================
   ROCKET LAUNCHERS
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
   DRAW SPARKLES
========================== */

function drawSparkles() {

    sparkles.forEach(

        sparkle => {

            ctx.beginPath();

            ctx.arc(
                sparkle.x,
                sparkle.y,
                sparkle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(
                    255,
                    215,
                    0,
                    ${sparkle.alpha}
                )`;

            ctx.fill();
        }
    );
}

/* ==========================
   MAIN ANIMATION
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
