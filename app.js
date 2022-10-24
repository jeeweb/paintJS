const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
//ctx.moveTo(0, 0); // 0,0 부터 시작

const colors = [
  "#ff3838",
  "#ffb8b8",
  "#c56cf0",
  "#ff9f1a",
  "#fff200",
  "#32ff7e",
]

function onClick(event) {
  // console.log(event);
  // 내가 찍은 값의 좌표는 offsetX, offsetY 값으로 알 수 있음
  ctx.beginPath(); // 그리는 선마다 path를 다르게 해서 색상이 다르게 표현됨
  ctx.moveTo(0, 0);  // 클릭할 때마다 0,0 부터 시작
  const color = colors[Math.floor(Math.random() * colors.length)];
  ctx.strokeStyle = color;
  
  ctx.lineTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

// canvas.addEventListener('click', onClick);
canvas.addEventListener('mousemove', onClick);