import SimSystem from './simSystem.js';

const table = document.querySelector('.table');
const sys = new SimSystem(table);

localStorage['params'] = {
  heightTable: document.querySelector('#height').value,
  widthTable: document.querySelector('#width').value,
};
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
