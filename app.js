const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 500;

let painting = false;
let filling = false;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;

	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function onMouseDown(event) {
	painting = true;
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const stroke = event.target.value; 
	ctx.lineWidth = stroke;	
}

function handleModeClick() {
	if(filling === true) {
		filling = false;
		mode.innerText = "Fill"
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
}

function handleCanvasClick() {
	if(filling) {
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}
}


if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
}

colors.forEach(color => color.addEventListener("click", handleColorClick));

if(range){
	range.addEventListener("input", handleRangeChange)
}

if(mode){
	mode.addEventListener("click", handleModeClick)
}