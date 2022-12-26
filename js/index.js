let table = document.querySelector('.table');

table.style.height = '100px';
table.style.width = '100px';

let dotList = [];
let dotCount = 0;
let foodList = [];
let foodCount = 0;

table.addEventListener('click', addDot);

setInterval(function () {
  init();
}, 1000);

function init() {
  if (dotList.length != 0) {
    dotList.forEach((element, i) => {
      setTimeout(() => {
        element.think();
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
  element.style.left = xDot + 'px';
  element.style.top = yDot + 'px';
  if (element.dataset.hungry > 0) {
    element.dataset.hungry -= 0.1;
  } else {
    element.dataset.hungry = 0;
    deadDot(element);
  }
}

function addDot(event) {
  const otherCheckbox = document.querySelector('#horns');
  if (otherCheckbox.checked) {
    const food = document.createElement('div');
    food.className = 'food';
    food.id = foodCount + 'f';
    food.setAttribute(
      'style',
      `left:${event.offsetX}px; top:${event.offsetY}px; z-index:0;`
    );
    food.dataset.satiety = 2;
    table.insertAdjacentElement('afterbegin', food);

    foodList.push({
      name: 'dot',
      object: document.getElementById(foodCount + 'f'),
      id: foodCount++ + 'f',
    });
  } else {
    const card = document.createElement('div');
    card.className = 'dot';
    card.id = dotCount;
    card.setAttribute(
      'style',
      `left:${event.offsetX}px; top:${event.offsetY}px; z-index:1;`
    );
    card.dataset.hungry = 4;
    table.insertAdjacentElement('afterbegin', card);

    dotList.push(new Dot('dot', document.getElementById(dotCount), dotCount++));
  }
}

function Dot(name, object, id) {
  this.name = name;
  this.object = object;
  this.id = id;
}

Dot.prototype.think = function () {
  const dotStyle = this.object.style;
  let minDist = [Infinity];
  foodList.forEach((element) => {
    const foodStyle = element.object.style;
    const dist = distance(
      pxToInt(dotStyle.left),
      pxToInt(dotStyle.top),
      pxToInt(foodStyle.left),
      pxToInt(foodStyle.top)
    );
    if (minDist[0] > dist) {
      minDist[0] = dist;
      minDist[1] = element.object;
    }
  });
  if (minDist[1] !== undefined) {
    if (minDist[0] < 1) {
      eatDot(this.object, minDist[1]);
    } else {
      findPath(this.object, minDist[1], minDist[0]);
    }
    //if dist <1 => eating
  }
};

function findPath(element, object) {
  const jumpDist = 10;
  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTarget = pxToInt(object.style.left);
  let yTarget = pxToInt(object.style.top);

  let x = xTarget - xDot;

  let y = yTarget - yDot;

  moveDot(element, x, y);

  if (x < jumpDist && y < jumpDist) {
    eatDot(element, object);
  }
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ''));
  return num;
}

function eatDot(dot, food) {
  dot.dataset.hungry =
    Number(dot.dataset.hungry) + Number(food.dataset.satiety);
  deadFood(food);
  createFood();
}

function deadDot(element) {
  dotList = dotList.filter(function (value) {
    return value.id != element.id;
  });
  element.remove();
}

function deadFood(element) {
  foodList = foodList.filter(function (value) {
    return value.id != element.id;
  });
  element.remove();
}

function createFood() {
  const food = document.createElement('div');
  food.className = 'food';
  food.id = foodCount + 'f';
  food.setAttribute(
    'style',
    `left:${(Math.random() * pxToInt(table.style.width)) | 0}px; top:${
      (Math.random() * pxToInt(table.style.height)) | 0
    }px; z-index:0;`
  );
  food.dataset.satiety = 2;
  table.insertAdjacentElement('afterbegin', food);

  foodList.push({
    name: 'dot',
    object: document.getElementById(foodCount + 'f'),
    id: foodCount++ + 'f',
  });
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
