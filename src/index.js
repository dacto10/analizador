import AnalizadorLexico from './analizador_lexico/analizadorLexico.js'
import AnalizadorSintactico from './analizador_sintactico/analizadorSintatico.js'

const lexico = new AnalizadorLexico();
let results = lexico.getLexico("as = 12 == fd ; asd = ds ; as ! 2 ; olv > 12 ;");
// let results = lexico.getLexico("asd = 12 ; tas == 543 ;");
console.log(results);
const sintactico = new AnalizadorSintactico(results);

results = sintactico.getSintactic();

console.log(results);
