let checkElement = document.querySelector(".checkValue");
let colorChangeElements = document.querySelectorAll(".changeColor");

let value = parseFloat(checkElement.innerHTML);

let isPositive = (value) => {
  return value > 0;
};

let isColor = isPositive(value) ? "positive" : "negative";

for(changeColor of colorChangeElements) {
    changeColor.classList.add(isColor);
}

