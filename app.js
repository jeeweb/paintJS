const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(50, 300, 100, 200);

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.fill();

ctx.beginPath();
ctx.rect(250, 250, 100, 100);
ctx.rect(350, 350, 100, 100);
ctx.fillStyle = "red";
ctx.fill();

ctx.moveTo(500, 500);
ctx.lineTo(600, 500);
ctx.lineTo(600, 600);
ctx.lineTo(500, 600);
ctx.lineTo(500, 500);
ctx.fill();