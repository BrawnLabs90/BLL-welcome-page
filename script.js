const canvas =
document.getElementById("fireworks");

const ctx =
canvas.getContext("2d");

function resize(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;
}

resize();

window.addEventListener(
"resize",
resize
);

let rockets=[];
let particles=[];

class Rocket{

constructor(){

this.x=
Math.random()*canvas.width;

this.y=
canvas.height;

this.speed=
8+Math.random()*4;

this.target=
100+
Math.random()*250;
}

update(){

this.y-=this.speed;

ctx.beginPath();

ctx.arc(
this.x,
this.y,
3,
0,
Math.PI*2
);

ctx.fillStyle=
"#ffffff";

ctx.fill();

ctx.beginPath();

ctx.moveTo(
this.x,
this.y
);

ctx.lineTo(
this.x,
this.y+20
);

ctx.strokeStyle=
"rgba(255,255,255,.4)";

ctx.stroke();

if(this.y<=this.target){

explode(
this.x,
this.y
);

return false;
}

return true;
}
}

class Particle{

constructor(
x,
y,
color
){

this.x=x;
this.y=y;

this.color=color;

this.angle=
Math.random()*
Math.PI*2;

this.speed=
Math.random()*8+2;

this.life=120;
}

update(){

this.x+=
Math.cos(
this.angle
)*this.speed;

this.y+=
Math.sin(
this.angle
)*this.speed;

this.speed*=0.97;

this.life--;

ctx.beginPath();

ctx.arc(
this.x,
this.y,
2,
0,
Math.PI*2
);

ctx.fillStyle=
this.color;

ctx.fill();
}
}

function explode(x,y){

const colors=[

"#FFD700",
"#FF0000",
"#00FFFF",
"#00FF00",
"#FFFFFF",
"#FFA500"

];

for(
let i=0;
i<180;
i++
){

particles.push(

new Particle(
x,
y,
colors[
Math.floor(
Math.random()*
colors.length
)
]
)
);
}
}

function animate(){

requestAnimationFrame(
animate
);

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

if(
Math.random()<0.03
){

rockets.push(
new Rocket()
);
}

rockets=
rockets.filter(
r=>r.update()
);

particles=
particles.filter(
p=>{

p.update();

return p.life>0;
}
);
}

animate();

const confettiContainer=
document.getElementById(
"confetti-container"
);

function createConfetti(){

const piece=
document.createElement(
"div"
);

piece.className=
"confetti";

piece.style.left=
Math.random()*100+
"%";

piece.style.background=
[
"#FFD700",
"#FF0000",
"#00FFFF",
"#FFFFFF"
][
Math.floor(
Math.random()*4
)
];

piece.style.animationDuration=
(
5+
Math.random()*5
)+"s";

confettiContainer.appendChild(
piece
);

setTimeout(()=>{

piece.remove();

},10000);
}

setInterval(
createConfetti,
150
);
