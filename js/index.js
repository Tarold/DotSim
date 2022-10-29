window.addEventListener("load", function () {});

var intervalId = window.setInterval(function () {
  init();
}, 5000);

function init() {
  const table = document.getElementsByClassName("table")[0];

  let tableHight = Number(table.style.left.replace(/px$/, ""));
  for (let index = 0; index < 25; index++) {
    ++tableHight;
    table.style.height = tableHight + "px";
  }
  console.log(tableHight);
}
