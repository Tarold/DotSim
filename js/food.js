import StandartDot from './StandartDot.js';

class Food extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.reserved = false;
    this.isGrowUp = false;
  }

  growing() {
    this.object.dataset.satiety = Number(this.object.dataset.satiety) + 0.2;
    if (this.object.dataset.satiety > 1) {
      this.isGrowUp = true;
      this.object.dataset.satiety = 1;
    }
  }

  getSatiety() {
    return this.object.dataset.satiety;
  }
}

export default Food;
