const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// 사람그리기

// 팔
ctx.fillRect(210 - 40, 200 - 30, 15, 100);
ctx.fillRect(350 - 40, 200 - 30, 15, 100);

// 몸통
ctx.fillRect(260 - 40, 200 - 30, 60, 200);

// 머리
ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill()

// 눈
ctx.beginPath();
ctx.fillStyle = "white"
ctx.arc(260 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.arc(220 + 10, 80, 8, Math.PI, 2 * Math.PI);
ctx.fill();