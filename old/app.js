const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll(".jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clearBtn = document.getElementById("jsClear");
const saveBtn = document.getElementById("jsSave");

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_WIDTH = winWidth * 0.9;
const CANVAS_HEIGHT = winHeight * 0.8;

let painting = false;
let filling = false;

canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT;

ctx.fillStyle = "#fff"
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

function handleCM(event) {
	event.preventDefault();	//우클릭방지
}

function handleClearClick() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleSaveClick() {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "paintJS-image"; 
	//console.log(link);
	link.click();
}


if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);
}

colors.forEach(color => color.addEventListener("click", handleColorClick));

if(range){
	range.addEventListener("input", handleRangeChange)
}

if(mode){
	mode.addEventListener("click", handleModeClick)
}

if(clearBtn) {
	clearBtn.addEventListener("click", handleClearClick);
}

if(saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick)
}