import StandartDot from './standartDot.js';

class Food extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.reserved = false;
    this.updateParam();
  }

  growing() {
    this.object.dataset.satiety =
      Number(this.object.dataset.satiety) + this.speedGrow;
    if (this.object.dataset.satiety >= this.growLimit) {
      this.changeStatus('grewUp');
      this.changeDataset('satiety', this.growLimit);
    }
  }
  isGrowUp() {
    return this.object.dataset.status === 'grewUp';
  }
  getSatiety() {
    return this.object.dataset.satiety;
  }
  updateParam() {
    this.growLimit = Number(localStorage.getItem('limitGrow'));
    this.speedGrow = Number(localStorage.getItem('speedGrow'));
  }
}

export default Food;
