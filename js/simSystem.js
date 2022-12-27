import Dot from './dot.js';
import Food from './food.js';

//modules for diferent scripts
//TODO коли точка поїсть, вона переноситься до кінця списку, щоб поїли ті, що не їли
//TODO точки повинні з'являтися на наступному ході(додати стан появи, або созрівання)
//TODO коли немає їжі точка швидко зникає

function SimSystem(table) {
  this.dotList = [];
  this.dotCount = 0;
  this.foodList = [];
  this.foodCount = 0;
  this.table = table;
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
};

SimSystem.prototype.addDot = function (x, y) {
  const dot = document.createElement('div');
  dot.className = 'dot';
  dot.id = this.dotCount;
  dot.setAttribute('style', `left:${x}px; top:${y}px; z-index:1;`);
  dot.dataset.hungry = 4;
  this.table.insertAdjacentElement('afterbegin', dot);

  this.dotList.push(
    new Dot(
      'dot',
      document.getElementById(this.dotCount),
      this.incDotCount(),
      function callbackFunction() {
        this.eatDot;
      },
      this.foodList,
      {
        width: this.table.style.width,
        height: this.table.style.height,
      }
    )
  );
  debugger;
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
  this.addFood(
    (Math.random() * pxToInt(this.table.style.width)) | 0,
    (Math.random() * pxToInt(this.table.style.height)) | 0
  );
};

SimSystem.prototype.getTable = function () {
  return { height: this.table.style.height, width: this.table.style.width };
};

export default SimSystem;
