'use strict';

import StandartDot from './StandartDot.js';

class Dot extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.status = undefined;
    this.objective = undefined;
    this.hungryForStep = 0.2;
    this.limitHungry = 5;
  }

  findObjective(foodList) {
    if (this.status === 'move') {
      this.status = 'eat';
      return;
    }
    if (this.status == 'eat') {
      if (this.getHungry() === '5') {
        this.status = 'spawn';
        return;
      }
    }

    const dotStyle = this.object.style;
    let oldFood = undefined;
    let oldDist = Infinity;

    foodList.forEach((food) => {
      if (!food.reserved && (food.isGrowUp || this.getHungry() < 1)) {
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
    if (this.object.dataset.hungry > this.limitHungry) {
      this.object.dataset.hungry = this.limitHungry;
    }
  }

  getHungry() {
    return this.object.dataset.hungry;
  }

  setHungry(hungry) {
    this.object.dataset.hungry = hungry;
  }

  isHungry() {
    if (this.getHungry() > 0) {
      return false;
    } else {
      this.setHungry(0);
      return true;
    }
  }

  findPath(object) {
    let xDot = pxToInt(this.object.style.left);
    let yDot = pxToInt(this.object.style.top);
    let xTarget = pxToInt(object.style.left);
    let yTarget = pxToInt(object.style.top);

    const x = xTarget - xDot;
    const y = yTarget - yDot;

    return [x, y];
  }

  moveDot([x, y]) {
    let xDot = pxToInt(this.object.style.left);
    let yDot = pxToInt(this.object.style.top);

    [xDot, yDot] = this.checkForBorders(xDot + x, yDot + y);

    this.object.style.left = xDot + 'px';
    this.object.style.top = yDot + 'px';

    this.object.dataset.hungry -= this.hungryForStep;
  }

  checkForBorders(xDot, yDot) {
    const height = localStorage.getItem('height');
    const width = localStorage.getItem('width');

    const xTable = height - 2;
    const yTable = width - 2;

    if (xDot > xTable) {
      xDot = xTable;
    } else if (xDot < 0) {
      xDot = 0;
    }

    if (yDot > yTable) {
      yDot = yTable;
    } else if (yDot < 0) {
      yDot = 0;
    }

    return [xDot, yDot];
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
