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
    if (this.dotList.length != 0) {
      const hungryList = this.foodList.sort((a, b) => {
        if (a === typeof Dot && b === typeof Dot)
          return a.getHungry() - b.getHungry();
      });

      this.dotList.forEach((dot, i) => {
        setTimeout(() => {
          dot.findObjective(hungryList);
          this.processingDot(dot);
        }, i * (1000 / this.dotList.length));
      });
    }

    if (this.foodList.length != 0) {
      this.foodList.forEach((food, i) => {
        setTimeout(() => {
          if (!food.isGrowUp) {
            food.growing();
          }
        }, i * (1000 / this.foodList.length));
      });
    }
  }

  processingDot(dot) {
    switch (true) {
      case dot.status === 'move': //move to eat
        dot.goingToEat();
        if (dot.isHungry()) {
          this.removeDot(dot);
        }
        break;

      case dot.status === 'eat': //eat
        this.eatDot(dot, dot.objective);
        this.randomSpawnFood();
        break;

      default: //wait
        dot.moveDot([
          Math.floor(Math.random() * 21 - 10),
          Math.floor(Math.random() * 21 - 10),
        ]);
        if (dot.isHungry()) {
          this.removeDot(dot);
        }
        break;
    }
  }

  createFoodObject(x, y) {
    const food = document.createElement('div');
    food.className = 'food';
    food.id = this.foodCount + 'f';
    food.setAttribute('style', `left:${x}px; top:${y}px; z-index:0;`);
    food.dataset.satiety = 0.2;
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
    dot.dataset.hungry = 4;
    return dot;
  }

  addDot(x, y) {
    this.table.insertAdjacentElement('afterbegin', this.createDotObject(x, y));
    this.dotList.push(new Dot('dot', document.getElementById(this.dotCount)));
  }

  removeDot(obj) {
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
    this.foodCount += 1;
    if (!Number.isSafeInteger(this.foodCount)) {
      this.foodCount = 0;
    }
    return this.foodCount;
  }
  incDotCount() {
    this.dotCount += 1;
    if (!Number.isSafeInteger(this.dotCount)) {
      this.dotCount = 0;
    }
    return this.dotCount;
  }
  eatDot(dot, food) {
    dot.eat(Number(food.object.dataset.satiety));
    this.removeFood(food);
  }

  randomSpawnFood() {
    const height = localStorage.getItem('height');
    const width = localStorage.getItem('width');

    this.addFood((Math.random() * width) | 0, (Math.random() * height) | 0);
  }

  moveToBorders() {
    const list = [...this.dotList, ...this.foodList];
    const a = new Dot();
    list.forEach((dot) => {
      const [x, y] = a.checkForBorders(
        Number(dot.object.style.left.replace(/px$/, '')),
        Number(dot.object.style.top.replace(/px$/, ''))
      );
      dot.object.style.left = x + 'px';
      dot.object.style.top = y + 'px';
    });
  }
}

export default SimSystem;
