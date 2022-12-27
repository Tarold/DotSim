'use strict';

class Dot {
  constructor(name, object, id) {
    this.name = name;
    this.object = object;
    this.id = id;
    this.status = undefined;
    this.objective = undefined;
  }

  findObjective(foodList) {
    if (this.status === 'move') {
      this.status = 'eat';
      return;
    }

    const dotStyle = this.object.style;
    let oldFood = undefined;
    let oldDist = Infinity;

    foodList.forEach((food) => {
      if (!food.reserved) {
        const foodStyle = food.object.style;
        const dist = distance(
          pxToInt(dotStyle.left),
          pxToInt(dotStyle.top),
          pxToInt(foodStyle.left),
          pxToInt(foodStyle.top)
        );
        if (oldDist > dist) {
          oldDist = dist;
          oldFood = food;
        }
      }
    });

    if (oldDist === Infinity) {
      this.status = 'wait';
      this.objective = undefined;
    } else {
      this.status = 'move';
      this.objective = oldFood;
    }
  }

  goingToEat() {
    this.objective.reserved = true;
    this.moveDot(this.findPath(this.objective.object));
  }

  eat(number) {
    this.object.dataset.hungry = Number(this.object.dataset.hungry) + number;
  }

  isHungry() {
    if (this.object.dataset.hungry > 0) {
      return false;
    } else {
      this.object.dataset.hungry = 0;
      return true;
    }
  }

  findPath(object) {
    const element = this.object;

    let xDot = pxToInt(element.style.left);
    let yDot = pxToInt(element.style.top);
    let xTarget = pxToInt(object.style.left);
    let yTarget = pxToInt(object.style.top);

    const x = xTarget - xDot;
    const y = yTarget - yDot;

    return [x, y];
  }

  moveDot([x, y]) {
    const element = this.object;
    const sceneParam = localStorage['params'] || 'defaultValue';

    let xDot = pxToInt(element.style.left);
    let yDot = pxToInt(element.style.top);

    let xTable = sceneParam.height - 1;
    let yTable = sceneParam.width - 1;

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

    this.object.dataset.hungry -= 0.1;
  }
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function pxToInt(variable) {
  let num = Number(variable.replace(/px$/, ''));
  return num;
}

export default Dot;
