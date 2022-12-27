'use strict';

import Dot from './dot.js';
import Food from './food.js';

//modules for diferent scripts
//TODO коли точка поїсть, вона переноситься до кінця списку, щоб поїли ті, що не їли
//TODO точки повинні з'являтися на наступному ході(додати стан появи, або созрівання)

//TODO коли точка чекає, вона може виходити за межі

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
      this.dotList.forEach((dot, i) => {
        setTimeout(() => {
          this.processingDot(dot);
        }, i * (1000 / this.dotList.length));
      });
    }
  }

  processingDot(dot) {
    dot.findObjective(this.foodList);

    console.log(dot.status);
    switch (true) {
      case dot.status === 'move': //move to eat
        dot.goingToEat();
        if (dot.isHungry()) {
          this.removeDot(dot);
        }
        break;

      case dot.status === 'eat': //eat
        this.eatDot(dot, dot.objective);
        break;

      default: //wait
        dot.moveDot([
          Math.floor(Math.random() * 21 - 10),
          Math.floor(Math.random() * 21 - 10),
        ]);
        break;
    }
  }

  addFood(x, y) {
    const food = document.createElement('div');
    food.className = 'food';
    food.id = this.foodCount + 'f';
    food.setAttribute('style', `left:${x}px; top:${y}px; z-index:0;`);
    food.dataset.satiety = 0.2;
    this.table.insertAdjacentElement('afterbegin', food);

    this.foodList.push(
      new Food(
        'dot',
        document.getElementById(this.foodCount + 'f'),
        this.incFoodCount() + 'f',
        false
      )
    );
  }

  addDot(x, y) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.id = this.dotCount;
    dot.setAttribute('style', `left:${x}px; top:${y}px; z-index:1;`);
    dot.dataset.hungry = 4;
    this.table.insertAdjacentElement('afterbegin', dot);

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

  incDotCount() {
    return this.dotCount++;
  }

  incFoodCount() {
    return this.foodCount++;
  }

  eatDot(dot, food) {
    dot.eat(Number(food.object.dataset.satiety));
    this.removeFood(food);
  }

  randomSpawnFood() {
    const sceneParam = localStorage['params'] || 'defaultValue';
    this.addFood(
      (Math.random() * sceneParam.width) | 0,
      (Math.random() * sceneParam.height) | 0
    );
  }
}

export default SimSystem;
