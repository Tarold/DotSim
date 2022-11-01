window.addEventListener("load", function () {
  globalThis.table = document.querySelector(".table");
  table.style.height = "100px";
  table.style.width = "100px";
  globalThis.dotList = [];
  globalThis.dotCount = 0;
  globalThis.foodList = [];
  globalThis.foodCount = 0;
  table.addEventListener("click", addDot);
});

setInterval(function () {
  init();
}, 1000);

function init() {
  if (dotList.length != 0) {
    dotList.forEach((element, i) => {
      setTimeout(() => {
        moveDot(document.getElementById(element["id"]), 10, 20);
      }, i * (1000 / dotList.length));
    });
  }
}

function moveDot(element, x, y) {
  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTable = pxToInt(table.style.height) - 1;
  let yTable = pxToInt(table.style.width) - 1;
  xDot += x;
  if (xDot > xTable) {
    xDot = xTable;
  } else if (xDot < 0) {
    xDot = 0;
  }
  yDot += y;
  if (yDot > yTable) {
    yDot = yTable;
  } else if (yDot < 0) {
    yDot = 0;
  }
  element.style.left = xDot + "px";
  element.style.top = yDot + "px";
  if (element.dataset.hungry > 0) {
    element.dataset.hungry -= 0.2;
  } else {
    element.dataset.hungry = 0;
    deadDot(element);
  }
}

function addDot(event) {
  const otherCheckbox = document.querySelector("#horns");
  console.log("otherCheckbox", otherCheckbox);
  if (otherCheckbox.checked) {
    const food = document.createElement("div");
    food.className = "food";
    food.id = foodCount + "f";
    food.setAttribute(
      "style",
      `left:${event.offsetX}px; top:${event.offsetY}px;`
    );
    food.dataset.satiety = 2;
    table.insertAdjacentElement("afterbegin", food);

    foodList.push({
      name: "dot",
      id: foodCount++ + "f",
    });
  } else {
    const card = document.createElement("div");
    card.className = "dot";
    card.id = dotCount;
    card.setAttribute(
      "style",
      `left:${event.offsetX}px; top:${event.offsetY}px;`
    );
    card.dataset.hungry = 4;
    table.insertAdjacentElement("afterbegin", card);

    dotList.push({
      name: "dot",
      id: dotCount++,
    });
  }
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ""));
  return num;
}

function deadDot(element) {
  dotList = dotList.filter(function (value) {
    return value["id"] != element.id;
  });
  element.remove();
}
