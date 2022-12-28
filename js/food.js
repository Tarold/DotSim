import StandartDot from './StandartDot.js';

class Food extends StandartDot {
  constructor(name, object, id) {
    super(name, object, id);

    this.reserved = false;
    this.isGrowUp = false;
  }

  growing() {}
}

export default Food;
