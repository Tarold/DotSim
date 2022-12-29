class StandartDot {
  constructor(name, object, id) {
    this.name = name;
    this.object = object;
    this.id = id;
  }

  changeDataset(param, value) {
    this.object.dataset[param] = value;
  }

  changeStatus(value) {
    this.changeDataset('status', value);
  }

  //all for movements

  //teleport to borders
  moveToBorders() {
    const [x, y] = this.checkForBorders(
      this.pxToInt(this.object.style.left),
      this.pxToInt(this.object.style.top)
    );
    this.object.style.left = x + 'px';
    this.object.style.top = y + 'px';
  }

  checkForBorders(xDot, yDot) {
    const height = localStorage.getItem('height');
    const width = localStorage.getItem('width');

    const xTable = height - 1;
    const yTable = width - 1;

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

  pxToInt(variable) {
    return Number(variable.replace(/px$/, ''));
  }
}

export default StandartDot;
