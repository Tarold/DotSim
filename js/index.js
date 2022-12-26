'strict mode';

let table = document.querySelector('.table');

table.style.height = '50px';
table.style.width = '50px';

const sys = new SimSystem();

setInterval(function () {
  sys.init();
}, 1000);

function SimSystem() {
  this.dotList = [];
  this.dotCount = 0;
  this.foodList = [];
  this.foodCount = 0;
}

SimSystem.prototype.init = function () {
  if (this.dotList.length != 0) {
    this.dotList.forEach((dot, i) => {
      setTimeout(() => {
        dot.think();
      }, i * (1000 / this.dotList.length));
    });
  }
};

SimSystem.prototype.addFood = function (x, y) {
  const food = document.createElement('div');
  food.className = 'food';
  food.id = sys.foodCount + 'f';
  food.setAttribute('style', `left:${x}px; top:${y}px; z-index:0;`);
  food.dataset.satiety = 0.2;
  table.insertAdjacentElement('afterbegin', food);

  sys.foodList.push(
    new Food(
      'dot',
      document.getElementById(sys.foodCount + 'f'),
      sys.incFoodCount() + 'f',
      false
    )
  );
};

SimSystem.prototype.addDot = function (x, y) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.id = sys.dotCount;
  dot.setAttribute('style', `left:${x}px; top:${y}px; z-index:1;`);
  dot.dataset.hungry = 4;
  table.insertAdjacentElement('afterbegin', dot);

  sys.dotList.push(
    new Dot('dot', document.getElementById(sys.dotCount), sys.incDotCount())
  );
};

SimSystem.prototype.removeObject = function (obj) {
  let list = obj.id.includes('f') ? this.foodList : this.dotList;

  list = list.filter(function (value) {
    return value.id != obj.id;
  });
  obj.remove();
};

SimSystem.prototype.incDotCount = function () {
  return this.dotCount++;
};

SimSystem.prototype.incFoodCount = function () {
  return this.foodCount++;
};

SimSystem.prototype.eatDot = function (dot, food) {
  dot.setHungry = Number(food.dataset.satiety); //TODO make get satiety
  this.removeObject(food);
  sys.addFood(
    (Math.random() * pxToInt(table.style.width)) | 0,
    (Math.random() * pxToInt(table.style.height)) | 0
  );
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

//TODO коли точка поїсть, вона переноситься до кінця списку, щоб поїли ті, що не їли
//TODO точки повинні з'являтися на наступному ході(додати стан появи, або созрівання)
//TODO коли немає їжі точка швидко зникає

Dot.prototype.think = function () {
  if (this.movingTo) {
    sys.eatDot(this.object, this.movingTo);
    this.movingTo = false;
  }
  const dotStyle = this.object.style;
  let minDist = [Infinity];
  sys.foodList.forEach((food) => {
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
    sys.removeObject(element);
  }
};

Dot.prototype.setHungry = function (number) {
  this.object.dataset.hungry += number;
};

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ''));
  return num;
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

table.addEventListener('click', addDot);

function addDot(event) {
  const otherCheckbox = document.querySelector('#horns');
  if (otherCheckbox.checked) {
    sys.addFood(event.offsetX, event.offsetY);
  } else {
    sys.addDot(event.offsetX, event.offsetY);
  }
}
