'strict mode';

let table = document.querySelector('.table');

table.style.height = '50px';
table.style.width = '50px';

table.addEventListener('click', addDot);

const sys = new SimSystem();

setInterval(function () {
  init();
}, 1000);

function init() {
  if (sys.dotList.length != 0) {
    sys.dotList.forEach((element, i) => {
      setTimeout(() => {
        element.think();
      }, i * (1000 / sys.dotList.length));
    });
  }
}

function addDot(event) {
  const otherCheckbox = document.querySelector('#horns');
  if (otherCheckbox.checked) {
    const food = document.createElement('div');
    food.className = 'food';
    food.id = sys.foodCount + 'f';
    food.setAttribute(
      'style',
      `left:${event.offsetX}px; top:${event.offsetY}px; z-index:0;`
    );
    food.dataset.satiety = 0.2;
    table.insertAdjacentElement('afterbegin', food);

    sys.foodList.push(
      new Food(
        'dot',
        document.getElementById(sys.foodCount + 'f'),
        sys.foodCount++ + 'f',
        false
      )
    );
  } else {
    const card = document.createElement('div');
    card.className = 'dot';
    card.id = sys.dotCount;
    card.setAttribute(
      'style',
      `left:${event.offsetX}px; top:${event.offsetY}px; z-index:1;`
    );
    card.dataset.hungry = 4;
    table.insertAdjacentElement('afterbegin', card);

    sys.dotList.push(
      new Dot('dot', document.getElementById(sys.dotCount), sys.incDotCount())
    );
  }
}

function SimSystem() {
  this.dotList = [];
  this.dotCount = 0;
  this.foodList = [];
  this.foodCount = 0;
}

SimSystem.prototype.incDotCount = function () {
  return this.dotCount++;
};

function Food(name, object, id) {
  this.name = name;
  this.object = object;
  this.id = id;
  this.reserved = false;
}

function Dot(name, object, id) {
  this.name = name;
  this.object = object;
  this.id = id;
  this.movingTo = undefined;
}

//коли точка їсть, переноситься до кінця списку

Dot.prototype.think = function () {
  if (this.movingTo) {
    eatDot(this.object, this.movingTo);
    this.movingTo = false;
  }
  const dotStyle = this.object.style;
  let minDist = [Infinity];
  sys.foodList.forEach((food) => {
    console.log('food :>> ', food);
    if (!food.reserved) {
      const foodStyle = food.object.style;
      const dist = distance(
        pxToInt(dotStyle.left),
        pxToInt(dotStyle.top),
        pxToInt(foodStyle.left),
        pxToInt(foodStyle.top)
      );
      if (minDist[0] > dist) {
        minDist[0] = dist;
        minDist[1] = food;
      }
    }
  });
  if (minDist[1] !== undefined) {
    if (minDist[0] < 1) {
      eatDot(this.object, minDist[1].object);
    } else {
      minDist[1].reserved = true;
      this.movingTo = minDist[1].object;
      this.findPath(minDist[1].object);
    }
    //if dist <1 => eating
  }
};

Dot.prototype.findPath = function (object) {
  const element = this.object;
  const jumpDist = 10;
  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTarget = pxToInt(object.style.left);
  let yTarget = pxToInt(object.style.top);

  let x = xTarget - xDot;

  let y = yTarget - yDot;

  this.moveDot(x, y);

  if (x < jumpDist && y < jumpDist) {
    //eatDot(element, object);
  }
};

Dot.prototype.moveDot = function (x, y) {
  const element = this.object;
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
};

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
  sys.foodList = sys.foodList.filter(function (value) {
    return value.id != element.id;
  });
  element.remove();
}

function createFood() {
  const food = document.createElement('div');
  food.className = 'food';
  food.id = sys.foodCount + 'f';
  food.setAttribute(
    'style',
    `left:${(Math.random() * pxToInt(table.style.width)) | 0}px; top:${
      (Math.random() * pxToInt(table.style.height)) | 0
    }px; z-index:0;`
  );
  food.dataset.satiety = 0.2;
  food.dataset.reserved = false;
  table.insertAdjacentElement('afterbegin', food);

  sys.foodList.push(
    new Food(
      'dot',
      document.getElementById(sys.foodCount + 'f'),
      sys.foodCount++ + 'f',
      false
    )
  );
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}
