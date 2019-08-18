const canvas = document.getElementById("canvas");
const tools = document.querySelectorAll(".tool");
let selectedTool = document.querySelector(".selected");
const historyBtns = document.querySelectorAll(".history");
const fileButtons = document.querySelectorAll(".file-button");

const Drawing = require("./drawing");
const dwg = new Drawing(canvas);

let down = false;
let inCanvas = false;
let startX, startY;

tools.forEach(tool => {
  tool.addEventListener("click", evt => {
    selectedTool.classList.remove("selected");
    evt.target.classList.add("selected");
    selectedTool = evt.target;
  })
})

historyBtns.forEach(historyBtn => {
  historyBtn.addEventListener("click", evt => {
    if (evt.target.id === "undo") {
      dwg.undo();
    } else if (evt.target.id === "redo") {
      dwg.redo();
    }
  })
})

fileButtons.forEach(btn => {
  btn.addEventListener("click", evt => {
    if (evt.target.id === "open") {
      dwg.open();
    } else if (evt.target.id === "save") {
      dwg.save();
    }
  })
})

canvas.addEventListener("mouseenter", () => inCanvas = true);
canvas.addEventListener("mouseleave", () => {
  inCanvas = false;
  down = false;
});

canvas.addEventListener("mousedown", evt => {
  if (!inCanvas || selectedTool.id === "polyline") return;
  down = true;
  startX = evt.offsetX;
  startY = evt.offsetY;
})

canvas.addEventListener("mouseup", evt => {
  if (selectedTool.id === "polyline") return;
  down = false;
  dwg.createShape(startX, startY, evt.offsetX, evt.offsetY, selectedTool.id);
})

canvas.addEventListener("mousemove", evt => {
  if (!down || !inCanvas) return;
  dwg.drawMarquee(startX, startY, evt.offsetX, evt.offsetY, selectedTool.id);
})

