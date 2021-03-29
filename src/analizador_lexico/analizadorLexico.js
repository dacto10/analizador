const input = "var = 15 != var2 == 41 >= 12 <= 56 > 3 < 2;" //cadena a leer
const results = [];
const characters = new RegExp("^[a-zA-Z]+$");
const numbers = new RegExp("^[0-9]+$");
let current = 0;

for (let i = 0; i < input.length; i++) {
   if (characters.test(input[i])) {
        results[current] = results[current] ? results[current].concat(input[i]) : input[i];
        if (!(characters.test(input[i + 1])) && !(numbers.test(input[i + 1]))) {
            current++;
        }
   } else if (numbers.test(input[i])) {
       results[current] = results[current] ? results[current].concat(input[i]) : input[i];
       !(numbers.test(input[i + 1])) && current++;
   } else if (input[i] === "=") {
        results[current] = results[current] ? results[current].concat(input[i]) : input[i];
        input[i + 1] !== "=" && current++;
   } else if (input[i] === ">" || input[i] === "<") {
        results[current] = input[i];
        input[i + 1] !== "=" && current++;
   } else if(input[i] === "!") {
        results[current] = input[i];
        input[i + 1] !== "=" && current++;
   } else if(input[i] === ";") {
        results[current] = input[i];
        current++;
   }
}

const resultsAlph = results.map(el => (el === "=" ? "<asign>" : el === "==" ? "<equals>" : el === "!=" ? "<distinct>" : el === ">" ? "<greather than>" : el === ">=" ? "<greather/equal than>": el === "<" ? "<lower than>" : el === "<=" ? "<lower/equal than>": el === ";" ? "<term>": `<${el}>`));

console.log(results);
console.log(resultsAlph.join(" "));