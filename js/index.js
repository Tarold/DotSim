window.addEventListener("load", function () {
  globalThis.table = document.querySelector(".table");
  table.style.height = "100px";
  table.style.width = "100px";
  globalThis.dotList = [];
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
  dotList.forEach((element) => {
    document.getElementById(element.id).style.left = "100px";
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
    id: dotList.length,
  });

  const dot = `
    <div class="dot" 
    id="${dotList.length - 1} 
    style="top:${event.offsetY}; 
    left:${event.offsetX};">
    </div>
    `;
  table.insertAdjacentHTML("afterbegin", dot);
  console.log("event", dotList);
}
