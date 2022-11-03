const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round"
let isPainting = false;
let isFilling = false;

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

function onModeClick(){
  if(isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCavasClick() {
  if(isFilling){
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function onDestroyClick() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onEraserClick() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  // console.dir(event.target);
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  // console.log(url);   // 유저가 선택한 이미지의 URL을 만들어 줌 
  const image = new Image();  // <img src="" />
  image.src = url;
  image.onload = function() {
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    fileInput.value = null; // file input을 비워줌
  }
}

function onDoubleClick(event) {
  const text = textInput.value;

  if (text !== "") {  // input에 어떠한 text도 없으면 아무일도 일어나지 않게 하기
    ctx.save(); // ctx의 현재상태, 색상, 스타일 등 모든것을 저장해줌
    // console.log(event.offsetX, event.offsetY);  // 마우스가 클릭한 지점의 좌표값
    
    ctx.lineWidth = 1;  // 글씨가 잘 보이게 하기 위해 lineWidth조정
    ctx.font = "48px serif"; // 글씨 size와 fon-family를 지정할 수 있음
    // ctx.strokeText(text, event.offsetX, event.offsetY);  // 글씨 테두리만 보여줌
    ctx.fillText(text, event.offsetX, event.offsetY);
    
    //글씨를 보여준 후 기존에 가지고 있던 lineWidth로 돌아가야함
    ctx.restore();  // save 했던 시점으로 돌아감 -> save와 restore 사이에서의 수정은 저장 되지 않음
  }
 
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
// canvas.onmousemove = onMove 로 표현할 수 있음
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCavasClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", onColorClick));

modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);