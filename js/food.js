import StandartDot from './StandartDot.js';

class Food extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.reserved = false;
  }

  growing() {
    this.object.dataset.satiety = Number(this.object.dataset.satiety) + 0.2;
    if (this.object.dataset.satiety > 1) {
      this.changeStatus('grewUp');
      this.changeDataset('satiety', '1');
    }
  }
  isGrowUp() {
    return this.object.dataset.status === 'grewUp';
  }
  getSatiety() {
    return this.object.dataset.satiety;
  }
}

export default Food;
