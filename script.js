"use strict";
const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".math-btn");
const equals = document.getElementById("equals");

const clickedBtns = [];
let clicked;
const interest = [];
const value = [];

screen.addEventListener("input", function (e) {
  e.preventDefault();
});

buttons.forEach((button) =>
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const click = e.target.dataset.btn;
    clickedBtns.push(click);
    if (click !== "+-" && click !== "=" && click !== "%" && click !== "AC") {
      clicked = click;
    } else clicked = "";
    if (screen.value) screen.value = screen.value + clicked;
    else if (!screen.value) screen.value = clicked;

    // +- operations

    if (e.target.dataset.btn === "+-") {
      if (+screen.value) screen.value = ` ${+screen.value * -1} `;
      else screen.value = "";
    }

    // % clicked  12*3% = 12/100*3
    if (e.target.dataset.btn === "%") {
      getRezInterest(clickedBtns);
      getValue(clickedBtns);
      const resultInt = (+value.join("") * +interest.reverse().join("")) / 100;
      console.log(value.join(""));
      console.log(interest.reverse().join(""));
      screen.value = `${resultInt}`;
    }

    // when clicked =
    if (e.target.dataset.btn === "=") {
      const result = new Function("return " + screen.value)();
      if (result != undefined) screen.value = result;
    }
    // Clear screen
    if (e.target.dataset.btn === "AC") screen.value = "";
  })
);

const getRezInterest = function (val) {
  for (let i = val.length - 2; i >= 0; i--) {
    if (!Number.isFinite(+val[i])) break;
    if (Number.isFinite(+val[i])) {
      interest.push(val[i]);
    }
    continue;
  }
};

const getValue = function (val) {
  for (let i = 0; i <= val.length; i++) {
    if (!Number.isFinite(+val[i])) break;
    if (Number.isFinite(+val[i])) {
      value.push(val[i]);
    }
    continue;
  }
};
