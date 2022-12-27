function Dot(name, object, id, eatFood, foodList, table) {
  this.name = name;
  this.object = object;
  this.id = id;
  this.movingTo = undefined;

  this.eatDot = eatFood;
  this.foodList = foodList;
  this.table = table;
}
//TODO переробити, щоб sys небуло в dots.js

Dot.prototype.think = function () {
  if (this.movingTo) {
    this.eatDot(this.object, this.movingTo);
    this.movingTo = false;
  }

  const dotStyle = this.object.style;
  let minDist = [Infinity];
  this.foodList.forEach((food) => {
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
      this.eatDot(this.object, minDist[1].object);
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

  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTarget = pxToInt(object.style.left);
  let yTarget = pxToInt(object.style.top);

  let x = xTarget - xDot;

  let y = yTarget - yDot;

  console.log(xTarget, xDot);

  this.moveDot(x, y);
};

Dot.prototype.moveDot = function (x, y) {
  const element = this.object;

  let xDot = pxToInt(element.style.left);
  let yDot = pxToInt(element.style.top);
  let xTable = pxToInt(this.table.height) - 1;
  let yTable = pxToInt(this.table.width) - 1;

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

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ''));
  return num;
}

export default Dot;
