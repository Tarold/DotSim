window.addEventListener("load", function () {
  globalThis.table = document.querySelector(".table");
  table.style.height = "100px";
  table.style.width = "100px";
  globalThis.dotList = [];
  table.addEventListener("click", addDot);
});

var intervalId = window.setInterval(function () {
  init();
}, 500);

function init() {
  dotList.forEach((element) => {
    moveDot(document.getElementById(element.id), 10, 20);
  });
}

function moveDot(element, x, y) {
  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTable = pxToInt(table.style.height);
  let yTable = pxToInt(table.style.width);
  element.style.backgroundColor = `rgb(
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)}
  )`;
  xDot += x;
  if (xDot > xTable) {
    xDot -= xTable;
  }
  yDot += y;
  if (yDot > yTable) {
    yDot -= yTable;
  } //add clone, that appear left on screen
  element.style.left = xDot + "px";
  element.style.top = yDot + "px";
}

function addDot(event) {
  const card = document.createElement("div");
  card.className = "dot";
  card.id = dotList.length;
  card.setAttribute("style", `left:${event.offsetX}px; top:${event.offsetY}px`);

  table.insertAdjacentElement("afterbegin", card);

  dotList.push({
    name: "dot",
    id: dotList.length,
  });
  console.log("event", dotList);
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ""));
  return num;
}
