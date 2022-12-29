'use strict';

import StandartDot from './StandartDot.js';

class Dot extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.objective = undefined;
    this.hungryForStep = 0.2;
    this.limitHungry = 5;
    this.recipeLimit = 1;
    this.updateParam();
  }

  findObjective(foodList) {
    const status = this.object.dataset.status;
    switch (true) {
      case status === 'move':
        this.changeStatus('eat');
        break;

      case status == 'eat' && this.getHungry() === String(this.limitHungry):
        this.changeStatus('spawn');
        break;

      case status == 'appearance':
        this.changeStatus('appear');
        break;

      case status == 'dead':
        this.changeStatus('remove');
        break;
      case this.isHungry():
        this.changeStatus('dead');
        break;
      default:
        const dotStyle = this.object.style;
        let oldFood = undefined;
        let oldDist = Infinity;

        foodList.forEach((food) => {
          if (
            !food.reserved &&
            (food.isGrowUp() || this.getHungry() < this.recipeLimit)
          ) {
            const foodStyle = food.object.style;
            const dist = distance(
              this.pxToInt(dotStyle.left),
              this.pxToInt(dotStyle.top),
              this.pxToInt(foodStyle.left),
              this.pxToInt(foodStyle.top)
            );
            if (oldDist > dist) {
              oldDist = dist;
              oldFood = food;
            }
          }
        });

        if (oldDist === Infinity) {
          this.changeStatus('wait');
          this.objective = undefined;
        } else {
          this.changeStatus('move');
          this.objective = oldFood;
        }
        break;
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
    const xDot = this.pxToInt(this.object.style.left);
    const yDot = this.pxToInt(this.object.style.top);
    const xTarget = this.pxToInt(object.style.left);
    const yTarget = this.pxToInt(object.style.top);

    const x = xTarget - xDot;
    const y = yTarget - yDot;

    return [x, y];
  }

  moveDot([x, y]) {
    let xDot = this.pxToInt(this.object.style.left);
    let yDot = this.pxToInt(this.object.style.top);

    [xDot, yDot] = this.checkForBorders(xDot + x, yDot + y);

    this.object.style.left = xDot + 'px';
    this.object.style.top = yDot + 'px';

    this.object.dataset.hungry -= this.hungryForStep;
  }

  updateParam() {
    this.hungryForStep = Number(localStorage.getItem('hungryForStep'));
    this.limitHungry = Number(localStorage.getItem('limitHungry'));
    this.recipeLimit = Number(localStorage.getItem('recipeLimit'));
  }
}

function distance(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

export default Dot;
