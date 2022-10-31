//const colorOptions = document.getElementsByClassName("color-option");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
// HTML Collection을 자바스크립트 배열로 만들어줌
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
let isPainting = false;

function onMove(event) {
  if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
}

function startPainting() {
  isPainting = true;
}

function cancelPainting() {
  isPainting = false;
  ctx.beginPath();
}

function onLineWidthChange(event) {
  //console.log(event);
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  // console.log(event.target.value); // 선택한 컬러값을 알 수 있음
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event){
  // 어떤 색상이 선택되었는지 알아보기
  // console.log(event.target);  // 선택된 html 태그를 보여줌
  // console.dir(event.target);  // 선택된 div의 관련 프로퍼티를 보여줌
  // console.log(event.target.dataset.color); //선택된 색상값
  const colorValue = event.target.dataset.color; 
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue; // 선택한 색상을 input에 표시
}

canvas.addEventListener('mousemove', onMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));