import SimSystem from './simSystem.js';

const table = document.querySelector('.table');
const buttApply = document.querySelector('#Apply');
const hTable = document.querySelector('#height');
const wTable = document.querySelector('#width');
const sys = new SimSystem(table);

setInterval(function () {
  sys.init();
}, 1000);

function Init() {
  table.addEventListener('click', addDot);

  buttApply.addEventListener('click', applyData);

  if (localStorage.getItem('height') === null) {
    localStorage.setItem('height', hTable.value);
    localStorage.setItem('width', wTable.value);
  } else {
    wTable.value = Number(localStorage.getItem('width'));
    hTable.value = Number(localStorage.getItem('height'));

    table.style.width = hTable.value + 'px';
    table.style.height = wTable.value + 'px';
  }
}

function applyData() {
  localStorage.setItem('height', hTable.value);
  localStorage.setItem('width', wTable.value);

  table.style.width = hTable.value + 'px';
  table.style.height = wTable.value + 'px';

  sys.moveToBorders();
}

function addDot(event) {
  const otherCheckbox = document.querySelector('#horns');
  if (otherCheckbox.checked) {
    sys.addFood(event.offsetX, event.offsetY);
  } else {
    sys.addDot(event.offsetX, event.offsetY);
  }
}

Init();
