import SimSystem from './simSystem.js';
import Settings from './settings.js';

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

const sys = new SimSystem(table);
const settings = new Settings(table);

function init() {
  setInterval(function () {
    sys.init();
  }, 1000);

  table.onclick = (event) => {
    if (buttFood.classList.contains('on')) {
      sys.addFood(event.offsetX, event.offsetY);
    } else {
      sys.addDot(event.offsetX, event.offsetY);
    }
  };
  buttApply.onclick = () => {
    settings.setData();
    sys.setNewParam();
  };

  buttDot.onclick = () => {
    buttDot.classList.add('on');
    buttFood.classList.remove('on');
  };

  buttFood.onclick = () => {
    buttFood.classList.add('on');
    buttDot.classList.remove('on');
  };

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

  buttReset.onclick = settings.applyData;
  buttDefault.onclick = settings.buttDefaultData;
}
init();
