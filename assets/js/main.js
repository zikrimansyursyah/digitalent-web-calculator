const inputSecond = document.querySelector(".input-second");
const inputFirst = document.querySelector(".input-first");
let result, finalResult;
let isResult = false;

const hasClass = (target, className) =>
  new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);

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
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value} +`;
        inputSecond.value = "";
        break;

      case "minus":
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value} -`;
        inputSecond.value = "";
        break;

      case "time":
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value} x`;
        inputSecond.value = "";
        break;

      case "distribution":
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value} :`;
        inputSecond.value = "";
        break;

      case "percent":
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value}%`;
        inputSecond.value = "";
        break;

      case "result":
        if (inputSecond.value != "")
          inputFirst.value += ` ${inputSecond.value}`;
        result = inputFirst.value.split(" ");
        result.shift();
        if (
          isNaN(parseFloat(result.slice(-1).pop())) &&
          result.slice(-1).pop() != "%"
        )
          result.pop();
        result.forEach((item, index) => {
          if (index === 0) {
            finalResult = parseFloat(item);
          }

          if (item.match(/%/) && result[index - 1]) {
            switch (result[index - 1]) {
              case "+":
                finalResult -= parseFloat(item.replace("%", ""));
                finalResult =
                  parseFloat(result[index - 2]) +
                  (finalResult * parseFloat(item.replace("%", ""))) / 100;
                break;

              case "-":
                finalResult += parseFloat(item.replace("%", ""));
                finalResult =
                  parseFloat(result[index - 2]) -
                  (finalResult * parseFloat(item.replace("%", ""))) / 100;
                break;

              case "x":
                finalResult /= parseFloat(item.replace("%", ""));
                finalResult =
                  (parseFloat(result[index - 2]) *
                    (finalResult * parseFloat(item.replace("%", "")))) /
                  100;
                break;

              case ":":
                finalResult *= parseFloat(item.replace("%", ""));
                finalResult =
                  parseFloat(result[index - 2]) /
                  (finalResult * parseFloat(item.replace("%", ""))) /
                  100;
                break;

              default:
                break;
            }
          } else if (item === "+") {
            finalResult += parseFloat(result[index + 1]);
          } else if (item === "-") {
            finalResult -= parseFloat(result[index + 1]);
          } else if (item === "x") {
            finalResult *= parseFloat(result[index + 1]);
          } else if (item === ":") {
            finalResult /= parseFloat(result[index + 1]);
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
