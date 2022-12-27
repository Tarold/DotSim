import SimSystem from './simSystem.js';

const table = document.querySelector('.table');

const sys = new SimSystem(table);

setInterval(function () {
  sys.init();
}, 1000);

table.addEventListener('click', addDot);

function addDot(event) {
  const otherCheckbox = document.querySelector('#horns');
  if (otherCheckbox.checked) {
    sys.addFood(event.offsetX, event.offsetY);
  } else {
    sys.addDot(event.offsetX, event.offsetY);
  }
}
