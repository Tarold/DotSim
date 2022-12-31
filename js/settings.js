class SettingsSystem {
  constructor(table) {
    this.table = table;
    this.hTable = document.querySelector('#height');
    this.wTable = document.querySelector('#width');
    this.sTable = document.querySelector('#scale');
    this.hungryFS = document.querySelector('#hungryForStep');
    this.limitH = document.querySelector('#limitHungry');
    this.recipeL = document.querySelector('#recipeLimit');
    this.startS = document.querySelector('#startSatiety');
    this.limitG = document.querySelector('#limitGrow');
    this.speedG = document.querySelector('#speedGrow');

    if (localStorage.getItem('width') === null) {
      this.setData();
    } else {
      this.applyData();
    }
  }

  setData() {
    localStorage.setItem('height', this.hTable.value);
    localStorage.setItem('width', this.wTable.value);
    localStorage.setItem('scale', this.sTable.value);
    localStorage.setItem('hungryForStep', this.hungryFS.value);
    localStorage.setItem('limitHungry', this.limitH.value);
    localStorage.setItem('recipeLimit', this.recipeL.value);
    localStorage.setItem('startSatiety', this.startS.value);
    localStorage.setItem('limitGrow', this.limitG.value);
    localStorage.setItem('speedGrow', this.speedG.value);

    this.updateTable(this.wTable.value, this.hTable.value, this.sTable.value);
  }

  updateTable(w, h, s) {
    this.table.style.width = w + 'px';
    this.table.style.height = h + 'px';
    this.table.style.transform = `scale(${Number(s)})`;
  }

  applyData() {
    this.wTable.value = localStorage.getItem('width');
    this.hTable.value = localStorage.getItem('height');
    this.sTable.value = localStorage.getItem('scale');

    this.hungryFS.value = localStorage.getItem('hungryForStep');
    this.limitH.value = localStorage.getItem('limitHungry');
    this.recipeL.value = localStorage.getItem('recipeLimit');
    this.startS.value = localStorage.getItem('startSatiety');
    this.limitG.value = localStorage.getItem('limitGrow');
    this.speedG.value = localStorage.getItem('speedGrow');
    this.updateTable(this.wTable.value, this.hTable.value, this.sTable.value);
  }

  setDefaultData() {
    this.wTable.value = 50;
    this.hTable.value = 50;
    this.sTable.value = 6;

    this.hungryFS.value = 0.2;
    this.limitH.value = 5;
    this.recipeL.value = 1;
    this.startS.value = -0.4;
    this.limitG.value = 1;
    this.speedG.value = 0.2;
  }
}

export default SettingsSystem;
