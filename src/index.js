import LexicAnalizer from './analizador_lexico/LexicAnalizer.js'
import SintacticAnalizer from './analizador_sintactico/SintacticAnalizer.js'

//Variable en la que se escriben las instrucciones a probar
const program = "variable = 1 != 2; variable == 5; variable = 12 == 5 > 5 < ads;"

const lexic = new LexicAnalizer();
let results = lexic.getLexic(program);

console.log("Lexic:");
console.log(results);

const sintactic = new SintacticAnalizer(results);
results = sintactic.getSintactic();

console.log("Sintatic:");
console.log(results);