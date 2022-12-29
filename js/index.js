import SimSystem from './simSystem.js';

const table = document.querySelector('.table');
const buttApply = document.querySelector('#Apply');
const buttReset = document.querySelector('#Reset');
const buttDefault = document.querySelector('#Default');
const buttDot = document.querySelector('.dotButton');
const buttFood = document.querySelector('.foodButton');
const advanced = document.querySelector('#advanced');
const advancedOptions = document.querySelectorAll('.advanced');
const optionsSection = document.querySelector('.input');
const options = document.querySelector('#options');

const hTable = document.querySelector('#height');
const wTable = document.querySelector('#width');
const sTable = document.querySelector('#scale');
const hungryFS = document.querySelector('#hungryForStep');
const limitH = document.querySelector('#limitHungry');
const recipeL = document.querySelector('#recipeLimit');
const startS = document.querySelector('#startSatiety');
const limitG = document.querySelector('#limitGrow');
const speedG = document.querySelector('#speedGrow');

const sys = new SimSystem(table);

setInterval(function () {
  sys.init();
}, 1000);

function init() {
  table.addEventListener('click', addDot);
  buttApply.addEventListener('click', buttApplyData);
  buttReset.addEventListener('click', applyData);
  buttDefault.addEventListener('click', buttDefaultData);

  buttDot.addEventListener('click', () => {
    buttDot.classList.add('on');
    buttFood.classList.remove('on');
  });

  buttFood.addEventListener('click', () => {
    buttFood.classList.add('on');
    buttDot.classList.remove('on');
  });

  advanced.addEventListener('change', () => {
    if (advanced.checked) {
      advancedOptions.forEach((i) => {
        i.classList.remove('hide');
      });
    } else {
      advancedOptions.forEach((i) => {
        i.classList.add('hide');
      });
    }
  });

  options.onclick = (e) => {
    optionsSection.classList.toggle('visible');
    e.target.classList.toggle('on');
  };

  if (localStorage.getItem('width') === null) {
    setData();
  } else {
    applyData();
  }
}

function setData() {
  localStorage.setItem('height', hTable.value);
  localStorage.setItem('width', wTable.value);
  localStorage.setItem('scale', sTable.value);
  localStorage.setItem('hungryForStep', hungryFS.value);
  localStorage.setItem('limitHungry', limitH.value);
  localStorage.setItem('recipeLimit', recipeL.value);
  localStorage.setItem('startSatiety', startS.value);
  localStorage.setItem('limitGrow', limitG.value);
  localStorage.setItem('speedGrow', speedG.value);

  updateTable(wTable.value, hTable.value, sTable.value);
}

function updateTable(w, h, s) {
  table.style.width = w + 'px';
  table.style.height = h + 'px';
  table.style.transform = `scale(${Number(s)})`;
}

function applyData() {
  wTable.value = localStorage.getItem('width');
  hTable.value = localStorage.getItem('height');
  sTable.value = localStorage.getItem('scale');

  hungryFS.value = localStorage.getItem('hungryForStep');
  limitH.value = localStorage.getItem('limitHungry');
  recipeL.value = localStorage.getItem('recipeLimit');
  startS.value = localStorage.getItem('startSatiety');
  limitG.value = localStorage.getItem('limitGrow');
  speedG.value = localStorage.getItem('speedGrow');
  updateTable(wTable.value, hTable.value, sTable.value);
}

function addDot(event) {
  if (buttFood.classList.contains('on')) {
    sys.addFood(event.offsetX, event.offsetY);
  } else {
    sys.addDot(event.offsetX, event.offsetY);
  }
}

function buttApplyData() {
  setData();
  sys.setNewParam();
}

function buttDefaultData() {
  wTable.value = 50;
  hTable.value = 50;
  sTable.value = 10;

  hungryFS.value = 0.2;
  limitH.value = 5;
  recipeL.value = 1;
  startS.value = -0.4;
  limitG.value = 1;
  speedG.value = 0.2;
}

init();
