window.addEventListener("load", function () {
  globalThis.table = document.querySelector(".table");
  table.style.height = "100px";
  table.style.width = "100px";
  globalThis.dotList = [
    {
      name: "dot",
      top: 10,
      left: 0,
    },
    {
      name: "dot",
      top: 0,
      left: 10,
    },
  ];

  table.addEventListener("click", addDot);

  updateTable();
});

var intervalId = window.setInterval(function () {
  updateTable();
  init();
}, 100);

function init() {
  dotList.forEach((element) => {
    moveDot(element, 1, 0);
  });
}

function updateTable() {
  table.innerHTML = "";
  dotList.forEach((element) => {
    const dot = document.createElement("div");
    dot.className = element.name;
    dot.style.top = element.top + "px";
    dot.style.left = element.left + "px";
    dot.style.backgroundColor = `rgb(
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)},
      ${Math.floor(Math.random() * 256)}
    )`;
    table.appendChild(dot);
  });
}

function moveDot(element, x, y) {
  let xDot = element.left;
  let yDot = element.top;
  let xTable = pxToInt(table.style.height);
  let yTable = pxToInt(table.style.width);
  xDot += x;
  if (xDot > xTable) {
    xDot -= xTable;
  }
  yDot += y;
  if (yDot > yTable) {
    yDot -= yTable;
  }
  element.left = xDot;
  element.top = yDot;
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ""));
  return num;
}

function addDot(event) {
  dotList.push({
    name: "dot",
    top: event.offsetY,
    left: event.offsetX,
  });
  console.log("event", dotList);
}
