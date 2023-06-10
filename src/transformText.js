var cursed = require("./cursed.json");

const getChar = (options, char) => {
  if (options.radio1 === "normal") {
    return char;
  }
  let num = Math.floor(Math.random() * cursed[char].length);
  return cursed[char][num];
};

export default function transformText(input, options) {
  input = input.toUpperCase();
  let output = "";

  if (options.radio2 === "random") {
  	let prevRands = [];
    for (let i = 0; i < input.length; i++) {
      let c = input[i];
      if (c === "I" && options.radio1 === "normal") {
      	output += getChar(options, c.toLowerCase());
      	prevRands.unshift(Math.random() / 2);
      } else if (c === "L" && options.radio1 === "normal") {
      	output += getChar(options, c);
      	prevRands.unshift(Math.random() / 2 + 0.5);
      } else if (c >= "A" && c <= "Z") {
      	let myRand = Math.random();
      	let myBias = prevRands.length >= 1 ? (prevRands.slice(0, 3).reduce((a, b) => a + b, 0)) / prevRands.slice(0, 3).length : 0.5;
      	let myChoice = myRand > myBias;
        output += getChar(options, myChoice ? c : c.toLowerCase());
        myRand += myChoice ? (1 - myRand) / 2 : myRand / -2;
        prevRands.unshift(myRand);
      } else {
        output += c;
      }
    }
    return output;
  }

  let alt = true;
  if (options.startUpper) {
    alt = false;
  }

  for (let i = 0; i < input.length; i++) {
    let c = input[i];
    if (c >= "A" && c <= "Z") {
      if (alt) {
        c = c.toLowerCase();
      }
      alt = !alt;
      output += getChar(options, c);
    } else if (c === " ") {
      output += c;
      if (options.startLower) {
        alt = true;
      }
      if (options.startUpper) {
        alt = false;
      }
    } else {
      output += c;
    }
  }

  return output;
}
