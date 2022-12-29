'use strict';

import Dot from './dot.js';
import Food from './food.js';

//TODO Added custom params and css styles
class SimSystem {
  constructor(table) {
    this.dotList = [];
    this.dotCount = 0;
    this.foodList = [];
    this.foodCount = 0;
    this.table = table;
  }

  init() {
    if (this.foodList.length != 0) {
      this.foodList.forEach((food, i) => {
        setTimeout(() => {
          if (!food.isGrowUp()) {
            food.growing();
          }
        }, i * (1000 / this.foodList.length));
      });
    }
    if (this.dotList.length != 0) {
      const hungryList = this.dotList.sort((a, b) => {
        if (a === typeof Dot && b === typeof Dot)
          return a.getHungry() - b.getHungry();
      });

      hungryList.forEach((dot, i) => {
        setTimeout(() => {
          dot.findObjective(this.foodList);
          this.processingDot(dot);
        }, i * (1000 / this.dotList.length));
      });
    }
  }

  processingDot(dot) {
    switch (dot.object.dataset.status) {
      case 'move': //move to eat
        dot.goingToEat();
        break;

      case 'eat': //eat
        this.eatDot(dot, dot.objective);
        this.randomSpawnFood();
        break;

      case 'spawn': //spawn new
        this.addDot(
          dot.pxToInt(dot.object.style.left),
          dot.pxToInt(dot.object.style.top)
        );
        dot.setHungry(2);
        break;

      case 'wait': //wait
        dot.moveDot([
          Math.floor(Math.random() * 21 - 10),
          Math.floor(Math.random() * 21 - 10),
        ]);
        break;

      case 'remove':
        this.removeDot(dot);
        break;
      default: //appear dead
        break;
    }
  }

  createFoodObject(x, y) {
    const food = document.createElement('div');
    food.className = 'food';
    food.id = this.foodCount + 'f';
    food.setAttribute(
      'style',
      `left:${x}px; top:${y}px; z-index:0; status:appearance;`
    );
    food.dataset.satiety = -0.4;
    food.dataset.status = 'appearance';
    return food;
  }

  addFood(x, y) {
    this.table.insertAdjacentElement('afterbegin', this.createFoodObject(x, y));
    this.foodList.push(
      new Food(
        'dot',
        document.getElementById(this.foodCount + 'f'),
        this.incFoodCount() + 'f'
      )
    );
  }

  createDotObject(x, y) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = this.dotCount;
    dot.setAttribute('style', `left:${x}px; top:${y}px; z-index:1;`);
    dot.dataset.hungry = 3;
    dot.dataset.status = 'appearance';
    return dot;
  }

  addDot(x, y) {
    this.table.insertAdjacentElement('afterbegin', this.createDotObject(x, y));
    this.dotList.push(
      new Dot('dot', document.getElementById(this.dotCount), this.incDotCount())
    );
  }

  removeDot(obj) {
    if (obj.objective !== undefined) {
      obj.objective.reserved = false;
    }
    this.dotList = this.dotList.filter(function (value) {
      return value.id != obj.id;
    });
    obj.object.remove();
  }

  removeFood(obj) {
    this.foodList = this.foodList.filter(function (value) {
      return value.id != obj.id;
    });
    obj.object.remove();
  }

  incFoodCount() {
    const param = this.foodCount;
    this.foodCount += 1;
    if (!Number.isSafeInteger(this.foodCount)) {
      this.foodCount = 0;
    }
    return param;
  }
  incDotCount() {
    const param = this.dotCount;
    this.dotCount += 1;
    if (!Number.isSafeInteger(this.dotCount)) {
      this.dotCount = 0;
    }
    return param;
  }
  eatDot(dot, food) {
    dot.eat(Number(food.object.dataset.satiety));
    this.removeFood(food);
  }

  randomSpawnFood() {
    const height = localStorage.getItem('height');
    const width = localStorage.getItem('width');

    this.addFood(
      (Math.random() * (width - 1)) | 0,
      (Math.random() * (height - 1)) | 0
    );
  }

  moveToBorders() {
    [...this.dotList, ...this.foodList].forEach((dot) => {
      dot.moveToBorders();
    });
  }
}

export default SimSystem;
