const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {

constructor(x,y,color){

this.x=x;
this.y=y;

this.color=color;

this.angle=Math.random()*Math.PI*2;
this.speed=Math.random()*8+2;

this.life=120;
}

update(){

this.x+=Math.cos(this.angle)*this.speed;
this.y+=Math.sin(this.angle)*this.speed;

this.speed*=0.97;
this.life--;

ctx.beginPath();
ctx.arc(this.x,this.y,2,0,Math.PI*2);
ctx.fillStyle=this.color;
ctx.fill();
}
}

function createFirework(){

let x=Math.random()*canvas.width;
let y=Math.random()*canvas.height/2;

const colors=[
"#FFD700",
"#FF0000",
"#00FFFF",
"#00FF00",
"#FFFFFF",
"#FFA500"
];

for(let i=0;i<150;i++){

particles.push(
new Particle(
x,
y,
colors[Math.floor(Math.random()*colors.length)]
));
}
}

setInterval(createFirework,1200);

function animate(){

requestAnimationFrame(animate);

ctx.clearRect(0,0,canvas.width,canvas.height);

particles=particles.filter(p=>{

p.update();

return p.life>0;
});
}

animate();

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});
