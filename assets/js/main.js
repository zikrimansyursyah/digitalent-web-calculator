const inputSecond = document.querySelector(".input-second");
const inputFirst = document.querySelector(".input-first");
let result, finalResult;
let isResult = false;

document.body.addEventListener("click", function (e) {
  if (hasClass(e.target, "btn-number")) {
    if (isResult) {
      inputSecond.value = e.target.getAttribute("aria-value");
      isResult = false;
    } else {
      inputSecond.value += e.target.getAttribute("aria-value");
    }
  } else if (hasClass(e.target, "clear")) {
    inputFirst.value = "";
    inputSecond.value = "";
  } else if (hasClass(e.target, "count")) {
    const count = e.target.getAttribute("aria-value");
    switch (count) {
      case "plus":
        if (!inputSecond.value == "") {
          inputFirst.value += ` ${inputSecond.value} +`;
        }
        inputSecond.value = "";
        break;

      case "minus":
        if (!inputSecond.value == "") {
          inputFirst.value += ` ${inputSecond.value} -`;
        }
        inputSecond.value = "";
        break;

      case "time":
        if (!inputSecond.value == "") {
          inputFirst.value += ` ${inputSecond.value} x`;
        }
        inputSecond.value = "";
        break;

      case "result":
        if (!inputSecond.value == "") {
          inputFirst.value += ` ${inputSecond.value}`;
        }
        result = inputFirst.value.split(" ");
        result.shift();
        if (isNaN(parseFloat(result.slice(-1).pop()))) {
          result.pop();
        }
        result.forEach((item, index) => {
          if (index === 0) {
            finalResult = parseFloat(item);
          }
          if (item === "+") {
            finalResult += parseFloat(result[index + 1]);
          } else if (item === "-") {
            finalResult -= parseFloat(result[index + 1]);
          } else if (item === "x") {
            finalResult *= parseFloat(result[index + 1]);
          }
        });
        inputFirst.value = "";
        inputSecond.value = finalResult;
        isResult = true;
        break;
      default:
        break;
    }
  }
});

function hitung() {}

function hasClass(target, className) {
  return new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);
}
